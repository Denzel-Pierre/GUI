/* 
 * File:   Element.cpp
 * Author: Denzel Pierre - Denzel_Pierre@student.uml.edu
 * 
 * Created on 17 September 2015, 09:57
 * Updated on 23 September 2015 - Changed function toString()
 * Updated on 26 September 2015 - Minor revisions
 */


#include "Element.h"
#include <cstdio>

/**
 * Default Constructor
 */
Element::Element() {
    tag_name = "Empty";
    line_number = 0;
}

/**
 * Copy Constructor
 * @param orig
 */
Element::Element(const Element& orig) {
}

/**
 * Destructor
 */
Element::~Element() {
}

/**
 * Constructor with given parameters
 * @param tag_name
 * @param line_number
 */
Element::Element(string T, int L)
{
    this->tag_name = T;
    this->line_number = L;
    
    return;
}

/**
 * Sets the tag name of the class to the given string
 * @param string
 */
void Element::set_tag_name(string s)
{
    tag_name = s;
}

/**
 * Sets the line number of the class to the given integer
 * @param line number
 */
void Element::set_line_number(int i)
{
    line_number = i;
}

/**
 * Getter function
 * @return the class element's tag name 
 */
string Element::get_tag_name() const
{
    return tag_name;
}

/**
 * Getter function
 * @return the class element's line number
 */
int Element::get_line_number() const
{
    return line_number;
}

/**
 * Prints out the class Element
 * @return Properly printed Element
 */
string Element::toString()
{    
   string retval = tag_name;
    
    return tag_name;
}

