$(document).ready(function() 
{    $("#results").click(function() {                


if (!$("input[name=q1]:checked").val() ||            
!$("input[name=q2]:checked").val() ||            
!$("input[name=q3]:checked").val()       
) {            
alert("You're not done yet!");        
}        

else {            
var cat1name = "1";            
var cat2name = "2";            
var cat3name = "3";                       
var cat11name = "None";

var cat1 = ($("input[name=q1]:checked").val() != "d"); 
           
var cat2 = ($("input[name=q2]:checked").val() != "c");  

var cat3 = ($("input[name=q3]:checked").val() != "a");  

var cat11 = (!cat1 && !cat2 && !cat3); var categories = [];                        

if (cat1) { categories.push(cat1name) };            
if (cat2) { categories.push(cat2name) };            
if (cat3) { categories.push(cat3name) };                         
if (cat11) { categories.push(cat11name)};                       
if (cat11) {
	// console.log("Hello!2");
	// console.log(this);
	// console.log("Hello!2");
// $.post('mongodb://admin:sustainical2017!@ds031681.mlab.com:31681/sustainical_db', {score: 1}, "jsonp")
	// UserSchema.update(
	//     { _id: User._id }, 
	//     { $push: { score: 1 } },
	//     done
	// );

	// var salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');;
	// var newPassword = this.hashPassword("someNew password");
	// User.update({_id: idd}, {
	//     info: "some new info", 
	//     password: newPassword
	// }, function(err, affected, resp) {
	//    console.log(resp);
	// })
};
	
	// User.score.push(1);
	// console.log(User);
                        

var catStr = 'You answered the following questions incorrectly: ' + categories.join(', ') + '';                     
$("#categorylist").text(catStr);                        
$("#categorylist").show("slow");            

if (cat1) { $("#category1").show("slow"); };            
if (cat2) { $("#category2").show("slow"); };            
if (cat3) { $("#category3").show("slow"); };                        
if (cat11) { $("#category11").show("slow"); };
{ $("#closing").show("slow"); };
}
    });});