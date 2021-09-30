function count_letters()
{
    document.getElementById("url-output").value="";
    var text_array = document.getElementById("url-input").value.split("");
    var answer_arry = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        /*a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0,u:0,v:0,w:0,x:0,y:0,z:0,
        A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0,K:0,L:0,M:0,N:0,O:0,P:0,Q:0,R:0,S:0,T:0,U:0,V:0,W:0,X:0,Y:0,Z:0,
        period:0,comma:0,dash:0,one:0,two:0,three:0 };*/
    var label_Array = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",".",",","-","1","2","3"];
    var answer_text = "";
    text_array.forEach(text=>{
        var ascii = text.charCodeAt(0);
        if(ascii < 65)
        {
            if(ascii == 46)//period
            {
                answer_arry[52] = answer_arry[52]+1;
            }
            else if(ascii == 44)//comma
            {
                answer_arry[53] = answer_arry[53]+1;
            }
            else if(ascii == 45)//dash
            {
                answer_arry[54] = answer_arry[54]+1;
            }
            else if(ascii == 49)//1
            {
                answer_arry[55] = answer_arry[55]+1;
            }
            else if(ascii == 50)//1
            {
                answer_arry[56] = answer_arry[56]+1;
            }
            else if(ascii == 51)//1
            {
                answer_arry[57] = answer_arry[57]+1;
            }
        }
        else if(ascii >= 65 && ascii<= 90)//cap letters
        {
            answer_arry[ascii-65]= answer_arry[ascii-65]+1;
        }
        else if(ascii >= 97 && ascii<= 122)//lower-case letters
        {
            answer_arry[ascii-71]= answer_arry[ascii-71]+1;
        }
    })
    for(var i=0;i<answer_arry.length;i++)
    {
        if(answer_arry[i]>0)
        {
            answer_text+= label_Array[i]+": "+answer_arry[i]+" ";
        }
    }
    document.getElementById("url-output").value += answer_text;
}