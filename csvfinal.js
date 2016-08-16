var fs = require('fs');
const readline = require('readline');
console.log("Starting");

var output=fs.createWriteStream('Theftjson.json');
output.readable=true;
output.writable=true;

const rl = readline.createInterface({
  input: fs.createReadStream('crimedata.csv')
  });
var header,currentline,yeararray,final= [];
var k = 0;
var overocc = 0;
var underocc=0;
var obj = {};
var final1 = [];
var finalArray=[];
var primary_type,description,year;
rl.on('line', function(input){
  if(k == 0)
  {
    header = input.split(',');
    primary_type = header.indexOf('Primary Type');
    description = header.indexOf('Description');
    year = header.indexOf('Year')
    k++;
  }
  else
  {
    var flag=0;
      var overOcc=0;
      var underOcc=0;
    currentline = input.split(",");
    if (currentline[primary_type] == 'THEFT'){
      if(currentline[year] >=2001 && currentline[year] <=2016){
        if(currentline[description] == 'OVER $500'){
          var overOcc=overOcc+1;
          var underOcc=0;
        }
        if(currentline[description] == '$500 AND UNDER'){
          var overOcc=0;
          var underOcc=underOcc+1;
        }
          var occ=0;
          for(var zz=0;zz<finalArray.length;zz++){
            if(finalArray[zz].year == currentline[year]){
              if(currentline[description] == 'OVER $500'){
              finalArray[zz].over=finalArray[zz].over+1;
            }
            if(currentline[description] == '$500 AND UNDER'){
            finalArray[zz].under=finalArray[zz].under+1;
          }
              flag++;

            }
          }
          if(flag==0){
            finalArray.push({"year":parseFloat(currentline[year]),"over":overOcc,"under":underOcc});

          }

      }//year if

    }//theft if

  }//else
//  console.log("the finalll",finalArray);

}).on('close',function(){
finalArray.sort(function(obj1,obj2){
  return obj1.year - obj2.year;
});
output.write(JSON.stringify(finalArray));
});

console.log("File finished");
