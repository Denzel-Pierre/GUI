/* 
 * File:   Element.h
 * Author: Denzel Pierre - Denzel_Pierre@student.uml.edu
 *
 * Created on 17 September 2015, 09:57
 * Updated on 26 September 2015 - Minor revisions and documentations
 */


#ifndef ELEMENT_H
#define	ELEMENT_H
#include <string> // for string functions
using namespace std;

class Element {
public:
    Element(); //Default Constructor
    Element(const Element& orig); //Copy Constructor
    Element(string T, int L); //Constructor with given parameters
    virtual ~Element(); //Destructor
    
    void set_tag_name(string s); //Sets the tag name of the class to the given string
    void set_line_number(int i); //Sets the line number of the class to the given integer
    
    string get_tag_name() const; //Getter function
    int get_line_number() const; //Getter function
    
    string toString(); //Prints out the class Element
private:
    string tag_name; //Name of the tag in the XML file
    int line_number; //Line number where the tag is found in the XML file
};


#endif	/* ELEMENT_H */

