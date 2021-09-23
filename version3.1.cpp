#include <iostream>
#include <string>
#include <stack>
#include<fstream>
using namespace std;
int main ()
{ 
   FILE *fp;
   char c;
   fstream file;
   string str_txt;
   int i,cnt=0,cnt1=0,cnt2=0,ss[100];
   int j=0;
   string str;
   string ans[100];
   stack<char>s;
   char file_path[100];
   cout<<"Please enter the file path£º";
   cin>>file_path;
   string a[35]={"auto","break","case","char","const","continue","default","do","double","else","enum","extern","float","for","goto","if","int","long","register","return","short","signed","sizeof","static","struct","switch","typedef","union","unsigned","void","volatile","while"};
   fp = fopen(file_path,"r");
   while((c = fgetc(fp))!=EOF){
        if((c>='a'&&c<='z')||(c>='A'&&c<='Z')){
   	      str+=c;
        }
       else{
	      if(str!=""){
	        for(i=0;i<35;i++){
	  	   if(str==a[i]){
	  		 cnt++;
	  		 if(i==25){
		   	   cnt1++;
		   	   if(s.empty()){
		   	     s.push('s');
		   	    }
		     }
		     if(i==2&&s.top()=='{'){
		     	cnt2++;
			 }
		   }
	      }
	      str="";
	    }
	    else{
	    	if((c=='{')&&(!s.empty())){
	          s.push(c);
			}	
			if((c=='}')&&(!s.empty())){
				s.pop();
				s.pop();
				ss[j++]=cnt2;
		   	    cnt2=0;
			}
		}
      }
      
  }
   cout<<"total num: "<<cnt<<endl;
   cout<<"switch num: "<<cnt1<<endl;
   cout<<"case num: ";
   for(i=0;i<j;i++){
   	cout<<ss[i]<<" ";
   }
   cout<<endl;
   file.open (file_path);
	string temp;
   while ( file.good() )
	{
		getline(file,temp);		
		str_txt = str_txt + temp + '\n';
	}
	int x[100] = {0};
    int head = 0,ebp = 0;
    int if_else = 0,if_elseif_else = 0;
    size_t if_position = str_txt.find(a[15]);
    if ( if_position != str_txt.npos )
    {
        x[ebp] = 1;
        ebp ++;
        for ( int i = if_position+1; i < str_txt.length(); i++ )
        {
            if ( str_txt.compare(i,7,"else if") == 0)
            {
                x[ebp] = 2;
                ebp ++;
                i += 7;
            }
            else if ( str_txt.compare(i,2,"if") == 0 )
            {
                x[ebp] = 1;
                ebp ++;
                i += 2;
            }
            else if ( str_txt.compare(i,4,"else") == 0)
            {
                int j = ebp-1;
                if ( x[j] != 1 && x[j] == 2 )
                {
                    while ( x[j] != 1 )
                    {
                        j--;
                    }
                    int ebp_1 = j;
                    for ( j; j<ebp; j++)
                    {
                        x[j] = 0;
                    }
                    ebp = ebp_1;
                    if_elseif_else ++;
                }
                else if ( x[j] == 1 )
                {
                    if_else ++;
                    x[j] = 0;
                    ebp = j;
                }
                i += 4;                
            }
 
        }
    }
     cout << "if-else num: " << if_else << endl;
     cout << "if-elseif-else num: " << if_elseif_else << endl;
}

   

