#include <iostream>
#include <fstream>
using namespace std;
 
int main() {
    int i,counter = 0;
    ifstream readfile;
    char filename[60];
    char text[60],ch;
    cout << "Please enter the file name£º";
    cin >> filename;
    readfile.open(filename);
    if(!readfile.is_open()) {
        cout << "No file found:" << filename << endl;
        return 1;
    }
    while(cin.get() != '\n');
    cout << "The keyword to be found: ";
    cin.getline(text,60);
    i = 0;
    while(readfile >> ch) {
        if(ch == text[i]) {
            for(++i; text[i] && (readfile >> ch); ++i)
                if(text[i] != ch) break;
            if(text[i] == '\0') ++counter;
            if(ch == text[0]) i = 1;
            else i = 0;
        }
    }
    cout << "\nThe file name: " << filename << endl;
    cout << "The keyword: " << text << endl;
    cout << "occurrences of the keyword: " << counter << endl;
    return 0;
}
