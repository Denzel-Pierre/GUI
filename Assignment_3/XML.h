/* 
 * File:   XML.h
 * Author: Denzel Pierre - Denzel_Pierre@student.uml.edu
 *
 * Created on 24 September 2015, 21:21
 * Updated on 25 September 2015 - Major additions
 */

#ifndef XML_H
#define	XML_H
#include <string> //for string functions
#include <vector> //for vector functions
using namespace std;

void parse_XML_file(); //Opens XML File and sends it to a function to be read
void determine_line(ifstream& fin); //Grabs each line from the XML file to determine whether it is an opening tag, complete element, comment, etc.
void determine_opening_tag(vector<Element*>& vecElementsFound, string& line, string& result, int line_number, bool& isVectorChanged); //Determines what type of tag each line contains based on the character after the '<' character.
void check_closing(vector<Element*>& vecElements, string element_name);

string trim( string& str ); //Trim leading and trailing white space (spaces and tabs) from the string passed as an argument and return the trimmed string.
string tag_search(string str); //Searches for opening and closing bracket (including white spaces) from the string passed as an argument and returns the substring
string cut_element_name_from_tag(string str); //Cuts the string so it only contains only the name of the Element
string cut_element_name_from_attribute(string str); //Cuts the string so it only contains only the name of the Element from an attribute
string cut_element_content(string str); //Creates a substring containing the content of a complete element

bool check_attribute(string str); //Checks for an equal sign in the tag name
bool is_complete_element(string str); //Checks if the line is a complete element

void print_normally(vector<Element*>& vecElements); //Iterates through the vector
void complete_comment(ifstream& fin, string& result); //Searching for the end comment tag, assuming everything in between is a comment
void printResult(string& line, int line_number); //Prints the result
void create_directive(string str); //Creates the Directive
void create_parser_state(vector<Element*>& vecElements, string str, int line_number); //Creates an Opening Parser
void close_parser_state(vector<Element*>& vecElements, string str); //Creates a Closing Parser
void complete_parser_state(vector<Element*>& vecElements, string str); //Creates a Complete Parser
void show_vector(vector<Element*>& vecElements, bool& isVectorChanged); //Shows any changes in the vector

#endif	/* XML_H */

