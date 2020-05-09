// Enter your code here
document.getElementById("number").addEventListener("keyup", function(){
    document.getElementById("result").innerHTML = document.getElementById("number").value;
    var input = document.getElementById("number").value;
    var number = Object.assign([], input);
    var reverseNumber = [];
    for(var i = 0; i < number.length;i++)
    {
        reverseNumber.push(number[i]);
    }
    reverseNumber = reverseNumber.reverse();
    if(number.length != reverseNumber.length)
    {
        document.getElementById("result").innerHTML = "Error in palindrome checking.";
    }
    var palindrome = true;
    for(var i=0; i < number.length;i++)
    {
        if(number[i]!= reverseNumber[i])
        {
            palindrome = false;
        }
    }
    if(palindrome == true)
    {
        document.getElementById("result").innerHTML = input + " is a palindrome.";
    }
    else
    {
        document.getElementById("result").innerHTML = input + " is NOT a palindrome.";
    }
});

