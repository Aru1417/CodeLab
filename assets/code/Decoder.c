
#include <iostream>
using namespace std;

int main()
{
int divisor, dividend, quotient, remainder;


cin >> dividend;


cin >> divisor;

quotient = dividend / divisor;
remainder = dividend % divisor;

cout << "Quotient = " << quotient << endl;
cout << "Remainder = " << remainder;

return 0;
}