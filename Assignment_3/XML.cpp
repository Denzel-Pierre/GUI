/* 
 * File:   XML.cpp
 * Author: Denzel Pierre - Denzel_Pierre@student.uml.edu
 * 
 * Created on 24 September 2015, 21:21
 * Updated on 25 September 2015 - Major additions
 */

#include <iostream> //for cout
#include <fstream> //for ifstream
#include <string> //for string functions
#include <vector> //for vector functions to parse XML file
#include <cstdlib> //for exit
#include "Element.h"
#include "XML.h"

/**
 * Grabs each line from the XML file to determine whether it is an opening tag, complete element, comment, etc.
 * @param XML File
 */
void determine_line(ifstream& fin) {
   string line; //holds each line from th XML file
   string result; //holds full version of each line for printing purposes
   int line_number = 0; //Line number of XML File
   vector<Element*> vecElementsFound; //Vector to hold class Elements
   bool isVectorChanged = false; //Determines if the Vector has recently changed in content
   bool isComment = false; //Determines if the current line is part of a comment.


   //ifstream fin("JesseSongs.xml"); //Open the XML File


   while (getline(fin, line)) //grabs each line of the XML file, assigns it to line, makes sure it is not NULL, or until end of file
   {
      isVectorChanged = false;
      line_number++; //Increases the line number to match each line of the XML file
      trim(line); //Trims each line to remove leading white space
      
      result = line; //Result holds a copy of line for editing purposes while line is used for searching purposes.
      
      printResult(result, line_number); //Prints the line number and result in an organized fashion.
      
      if(line.find("<!--") != string::npos && line.find("-->") != string::npos)
      {
         //If program arrives here, line is a one-line comment.
         cout << "*** One-Line Comment" << endl << endl;
         isComment = false;
      }
      else if (line.find("<!--") != string::npos)
      {
         //If program arrives here, line is a comment tag.
         cout << "*** Starting Comment" << endl << endl;
         isComment = true;
      }
      else if (line.find("-->") != string::npos)
      {
         //If program arrives here, line is an ending comment tag.
         cout << "*** Ending Comment" << endl << endl;
         isComment = false;
      }
      else if (isComment)
      {
         //If program arrives here, line is part of a comment.
         cout << "***Comment Line" << endl << endl;
      }
      else if (line[0] == '<')
      {
         //If program arrives here, line is an opening tag or a complete element
         if (!is_complete_element(line))
         {
            //If program arrives here, line is NOT a complete element
            result = tag_search(line); //Result becomes truncated to the tag_name taken from line
         }
         determine_opening_tag(vecElementsFound, line, result, line_number, isVectorChanged);
      }
      else if(line == "\r")
      {
         cout << "***Blank Line" << endl << endl;
      }
      else
      {
         //If program arrives here, this is not a tag nor a comment.
         
         cout << "ERROR: This is not a tag or a comment and is therefore invalid" << endl;
         cout << "Cannot complete parsing XML File" << endl;
         exit(EXIT_FAILURE);
      }
   }
}

/**
 * Opens XML File and sends it to a function to be read
 */
void parse_XML_file()
{
   ifstream fin("MySongs.xml"); //Open the XML File
   
   determine_line(fin);
}

/**
 * Determines what type of tag each line contains based on the character after the '<' character.
 * @param The vector to hold and print class Element
 * @param string that determines type of tag
 * @param (possibly truncated) string
 * @param line_number
 * @param if the vector has changed recently
 */
void determine_opening_tag(vector<Element*>& vecElementsFound, string& line, string& result, int line_number, bool& isVectorChanged)
{
   if (line[1] == '?') 
   {
      //If program arrives here, line is a Directive
      create_directive(line);
   } 
   else if (line[1] == '/') 
   {
      //If program arrives here, line is a closing tag
      vecElementsFound.pop_back();
      isVectorChanged = true;
      close_parser_state(vecElementsFound, result);
      show_vector(vecElementsFound, isVectorChanged);
      cout << endl << endl;
   } 
   else 
   {
      //if program arrives here, line is an opening tag

      if (is_complete_element(line)) 
      {
         //If program arrives here, line is a complete element
         complete_parser_state(vecElementsFound, result);
         show_vector(vecElementsFound, isVectorChanged);
      } 
      else 
      {
         //If program arrives here, line is NOT a complete element
         isVectorChanged = true;
         create_parser_state(vecElementsFound, result, line_number);
         show_vector(vecElementsFound, isVectorChanged);
         cout << endl << endl;
      }
   }
}

/**
 * Trim leading and trailing white space (spaces and tabs) from the 
 *    string passed as an argument and return the trimmed string.
 * @param str string to trim
 * @return trimmed string
 * 
 * Obtained this function from Professor Jesse Heines
 */
string trim( string& str ) 
{
  // cout << "Trimming |" << str << "|" << endl ;  // for debugging
  while ( str[0] == ' ' || str[0] == '\t' ) 
  {
    str.erase( str.begin() ) ;  // must use an iterator
  }
  while ( str[str.length()-1] == ' ' || str[str.length()-1] == '\t' ) 
  {
    str.erase( str.end()-1 ) ;  // must use an iterator
  }
  return str ;
}

/*
 * Searches for opening and closing bracket (including white spaces) from
 *     the string passed as an argument and returns the substring
 * @param str string to search
 * @return substring
 */
string tag_search(string str)
{
    size_t startpos; //Starting position of str
    size_t found; // Ending position of str
    string line; //Substring of str
    
    startpos = str.find("<"); //Searches for opening bracket of the tag line in a string.
    found = str.find(">"); //Searches for the closing bracket of the tag line in a string.
    line = str.substr(startpos, found+1); //Creates a substring based on the character AFTER the opening bracket and BEFORE the closing bracket.
    
    return line;
}

/**
 * Prints out the line and line number
 * @param The current line in the XML file
 * @param The line number where the line is held
 */
void printResult(string& line, int line_number)
{
   cout << line_number << ":  " << line << endl;
}

/**
 * Prints out specifically the Directive Line
 * @param Directive line string
 */
void create_directive(string str)
{
   size_t first_occ;
   size_t second_occ;
   size_t third_occ;
   size_t fourth_occ;
   string directive;
   string encoding;

   first_occ = str.find('"'); //Searches for the first quotation mark in the string
   second_occ = str.find('"', first_occ+1); //Searches for the second quotation mark in the string
   third_occ = str.find('"', second_occ+1); //Searches for the third quotation mark in the string
   fourth_occ = str.find('"', third_occ+1); //Searches for the fourth quotation mark in the string
   
   directive = str.substr(first_occ, 5); //Creates a substring of the directive between the first and second quotation mark
   encoding = str.substr(third_occ, 7); //Creates a substring of the encoding between the third and fourth quotaton mark
 
   cout << "*** Directive = xml version=" << directive << " encoding=" << encoding << endl << endl;
}

/**
 * Checks for an equal sign in the tag name
 * @param string of a given line in the XML file
 * @return whether or not the line is an attribute via the equal sign in the tag name
 */
bool check_attribute(string str)
{
   bool answer = false;
   
   if(str.find('=') != string::npos)
   {
      answer = true;
   }
   
   return answer;
}

/**
 * Creates a state and creates a class Element for the vector. Also prints out the opening Element
 * @param vector to hold class Element
 * @param string of tag
 * @param line number of XML file
 */
void create_parser_state(vector<Element*>& vecElements, string str, int line_number)
{
   string element_name;
   
   if(check_attribute(str)) //If the string contains an attribute or not
   {
      element_name = cut_element_name_from_attribute(str);
   }
   else
   {
      element_name = cut_element_name_from_tag(str);
   }
   
   
   cout << "*** Element Opened = " << element_name << endl;
   
   vecElements.push_back(new Element(element_name, line_number)); //Pushes each element to the vector

}

/**
 * Closes the state and prints out the closing Element
 * @param vector of class Element pointers
 * @param string containing closing tag
 */
void close_parser_state(vector<Element*>& vecElements, string str)
{
   string element_name; //Holds truncated line to carry only the Element name
   
   if(check_attribute(str)) //If the string contains an attribute or not
   {
      element_name = cut_element_name_from_attribute(str);
   }
   else
   {
      element_name = cut_element_name_from_tag(str);
   }
   
   element_name = element_name.substr(1);
   
   check_closing(vecElements, element_name);
   
   cout << "*** Element Closed = " << element_name << endl;
}

/**
 * Checks if the element in the line given matches the last element of the vector. Exits program if false
 * @param vector of element pointers
 * @param element name
 */
void check_closing(vector<Element*>& vecElements, string element_name)
{  
   string vector_element;
   vector<Element*>::iterator iter = vecElements.end(); //Iterator to the last element of the vector.
   
   vector_element = (*iter)->toString(); //retrieves the last element of the vector and passes it to a string variable
   
   if(element_name != vector_element)
   {
      /*If programs arrives here, the closing tag does not match the last element the vector, which indicates the XML file
       * is not well-formed
      */ 
      cout << "ERROR: CLOSING ELEMENT DOES NOT MATCH LAST OPENED ELEMENT" << endl;
      cout << "Expecting element: " << vector_element << endl;
      exit(EXIT_FAILURE);
      
   }
}

/**
 * Creates and closes a state of a complete element
 * @param vector of class Element pointers
 * @param string containing complete Element
 */
void complete_parser_state(vector<Element*>& vecElements, string str)
{
   string element_name;
   string element_content;
   
   element_name = cut_element_name_from_tag(str);
   element_content = cut_element_content(str);
   
   cout << "*** Complete Element found:" << endl;
   cout << "*** Element Name = " << element_name << endl;
   cout << "*** Element Content = " << element_content << endl;
}

/**
 * Cuts the string so it only contains only the name of the Element
 * @param string containing entire Element
 * @return Element name
 */
string cut_element_name_from_tag(string str)
{
    size_t startpos;
    size_t found;
    string line;
    
    startpos = str.find("<"); //Searches for opening bracket of the tag line in a string.
    found = str.find(">"); //Searches for the closing bracket of the tag line in a string.
    line = str.substr(startpos+1, found-1); //Creates a substring based on the character AFTER the opening bracket and BEFORE the closing bracket.
    
    return line;
}

/**
 * Cuts the string so it only contains only the name of the Element from an attribute
 * @param string containing entire Element & attribute
 * @return Element name
 */
string cut_element_name_from_attribute(string str)
{
   size_t found;
   string line;
   
   found = str.find(' '); //Searches for any white spaces in the tag name
   line = str.substr(1, found-1); //Creates a "trimmed" substring ending on the white space
   
   return line;
}

/**
 * Creates a substring containing the content of a complete element
 * @param string containing the element and content
 * @return string containing content
 */
string cut_element_content(string str) {
   size_t startpos; //Starting position
   size_t endpos; //Ending position
   string line; //Substring of string str

   startpos = str.find('>'); //Searches for CLOSING bracket of the tag line in a string.
   line = str.substr(startpos + 1); //Creates a substring based on the character AFTER the opening bracket.
   endpos = line.find('<'); //Searches for the OPENING bracket of the tag line in a string after the closing bracket.
   line = line.substr(0, endpos); //Creates of substring ending on the opening bracket

   return line;
}

/**
 * Checks if the line is a complete element
 * @param string containing entire Element & attribute
 * @return Whether it is a complete Element.
 */
bool is_complete_element(string str)
{
   bool isCompleteTag = false;
   
   if(str.find("</") != string::npos)
   {
      isCompleteTag = true;
   }
   if(str.find("/>") != string::npos)
   {
      isCompleteTag = true;
   }
   
   return isCompleteTag;
}


/**
 * Prints out the changes in the vector, or unchanged if there is no recent changes
 * @param vector of Element pointers
 * @param bool determining if there are any changes in the vector.
 */
void show_vector(vector<Element*>& vecElements, bool& isVectorChanged)
{
   if(isVectorChanged == false)
   {
      cout << "*** Vector (stack) unchanged." << endl << endl;
   }
   else
   {
      cout << "*** Vector (stack) now contains: ";
      
      if(vecElements.empty())
      {
         cout << "{empty}" << endl << endl;
      }
      else
      {
         for (vector<Element*>::iterator it = vecElements.begin(); it != vecElements.end(); ++it) {
        cout << (*it)->toString() << " ";
      }
      
    }
   }
}
