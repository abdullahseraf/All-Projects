   /*//1
var light = "green"

 if (light == "green") {
    console.log("Drive")
  } else if (light == "orange") {
    console.log("Get ready")
  } else if (light == "red") {
    console.log("Dont' drive")
  } else {
    console.log("The light is not green, orange, or red");
  }
  //2
  for (var i = 1; i <= 2; i++) {

    for (var j = 1; j <= 5; j++) {

      console.log(" WEEK " + i + " DAY " + j )
    }
   }

   //3
   function addTwoNums(a,b) {
    var c = a + b ;
    console.log(c);
   }
   addTwoNums(2,2);
   addTwoNums(4,4);

   //4
   var train1 = [ "wheat", "barley", "potato", "salt", "rocks"]

   console.log(train1[3])

   //5 
   var assistantManager = {
    movement : 3,
    socialskills : 30,
    streetsmarts : 30,
    health : 40, 
   }
    console.log(assistantManager);

   //6 
   var Name = " hello ";
   var user = " lisa ";

   console.log(Name + user); 

   console.log(Name.concat(user));

   //7

   var shoes = 150;
   var statetax = 1.2;

   function totalprice (shoes,tax){
    return shoes * tax;
   }
      var topay = totalprice (shoes,statetax);
 
   console.log(topay);

   //8 

   var purchase1 = {
    shoes: 150,
    statetax: 1.2,
    totalprice: function(){
      var calcu = purchase1.shoes * purchase1.statetax;
      return calcu;
    }
   }
  console.log(purchase1.totalprice());


   switch(light) {
   case 'green':
       console.log("Drive");
       break;
   case 'orange':
       console.log("Get ready");
       break;
   case 'red':
       console.log("Don't drive");
       break;
   default:
       //this block will run if no condition matches
       console.log('The light is not green, orange, or red');
}
*/

//10
function listArrayItems(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(i, arr[i])
    }
}
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];
listArrayItems(colors);

var name = ['ab', 'ad', 'ee', 'rr'];
listArrayItems(name);