/* 
 * File:   main.cpp
 * Author: Denzel Pierre - Denzel_Pierre@student.uml.edu
 *
 * Created on 17 September 2015, 09:56
 * Updated on 21 September 2015 - Major additions
 * Updated on 26 September 2015 - Major revisions
 */

#include <iostream> //for cout
#include <fstream> //for ifstream
#include <string> //for string functions
#include <vector> //for vector functions to parse XML file
#include "Element.h"
#include "XML.h"

using namespace std;

int main(int argc, char** argv) 
{
   parse_XML_file(); //Parses the XML file for use.
  
   //Ensures that the program is completed.
   cout << "Done." << endl;

   return 0;
}