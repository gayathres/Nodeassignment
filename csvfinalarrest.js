var fs = require('fs');
const readline = require('readline');
console.log("Starting");


var output=fs.createWriteStream('Assaultcases.json');
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
    description = header.indexOf('Arrest');
    year = header.indexOf('Year')
    k++;
  }
  else
  {
    var flag=0;
      var overOcc=0;
      var underOcc=0;
    currentline = input.split(",");
    if (currentline[primary_type] == 'ASSAULT'){
      //console.log("11");
      if(currentline[year] >=2001 && currentline[year] <=2016){
        //console.log("22",currentline[description]);
            if(currentline[description] == 'TRUE' || currentline[description] == 'true'){
          //    console.log("33");
              var overOcc=overOcc+1;
              var underOcc=0;
            }
            if(currentline[description] == 'FALSE' || currentline[description] == 'false'){
            //  console.log("44");
              var overOcc=0;
              var underOcc=underOcc+1;
            }
          var occ=0;
            for(var zz=0;zz<finalArray.length;zz++){
              if(finalArray[zz].year == currentline[year]){
                if(currentline[description] == 'TRUE' || currentline[description] == 'true'){
                finalArray[zz].arrest=finalArray[zz].arrest+1;
              }
              if(currentline[description] == 'FALSE' || currentline[description] == 'false'){
              finalArray[zz].notarrest=finalArray[zz].notarrest+1;
              }
                flag++;

              }
            }
          if(flag==0){
            finalArray.push({"year":parseFloat(currentline[year]),"arrest":overOcc,"notarrest":underOcc});

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
