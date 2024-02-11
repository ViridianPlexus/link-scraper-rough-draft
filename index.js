// var grand_object = {}; // Declare an empty object

// // Add nested empty object
// grand_object.nested_object = {};


let x =0;
let g=0;
let o = 1;

function cambridge_dictionary_catcher (page_link)
{
    var alphabet= {1:'a',2:'b',3:'c',4:'d',5:'e',6:'f',7:'g',8:'h',9:'i',10:'j',11:'k',12:'l',13:'m',14:'n',15:'o',16:'p',17:'q',18:'r',19:'s',20:'t',21:'u',22:'v',23:'w',24:'x',25:'y',26:'z'}
    var keys;

    var grand_object = {}; // Declare an empty object


    //create variable to hold number
    var string_toInt = 0;

    // string to intger
    string_toInt = parseInt(page_link);``
    // modulo such that whatever string value you get, you can aquire some value between 0 and 25
    string_toInt = string_toInt % 26;
    //make that letter into an object in the grand object
    grand_object[alphabet[string_toInt]] = {};
    //delete that used letter from the alphabet group just to make it easier
    delete alphabet[string_toInt];
    //create objects in object based on all the letters
    for(x in alphabet)
    {
      if ((alphabet[x]) != undefined)
      {
        grand_object[alphabet[x]] = {};
      }
    }
    keys = Object.keys(grand_object);
    //just wanted to test and see the keys
   // //console.log(keys);
    for(x in keys)
    {
      ////console.log(grand_object[keys[x]])
      grand_object[keys[x]] =  object_stuffer(keys[x], grand_object[keys[x]])

    }

    //console.log(grand_object);

   grand_object_aftr_enumeration = link_enumerator(grand_object);



   obsidian_printer(grand_object_aftr_enumeration);

  // find the letter as it corresponds with that number in the alphabet.
  //whatever letters remain in the rest of the alphabet, get those other letter and declare them
  // as keys for objects in the grand object, of 2d arrays

  // create random strings of varying lengths all with the same letter given whatever letter
  //42
  //we are currently on, then add those random strings as keys where 2d arrays
  //are their values
  // in the 00 place of the 2d array, place length of word
  //in the 01 place of the 2d array, place value of word



  // grand object = link_enumerator(grandobjec)

}

function link_enumerator(maelstrom){


  console.log(maelstrom);


  function generateLoremIpsum(paragraphs = 1) {
    const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Phasellus blandit nec justo id ullamcorper.
    Nullam ultrices sapien quis eros sagittis, eget aliquet purus consectetur.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    Sed tristique libero vel justo pretium, non consectetur est congue.
    Vestibulum consectetur, nisi nec viverra tincidunt, est leo vehicula sem, vel aliquam ex nisl a nisi.
    Sed vel malesuada odio, id hendrerit eros.`;

    return loremIpsum.repeat(paragraphs);
}

  //10 do lorem ipsum the length of 100 characters multiplied by the sum of
  for (const letter in maelstrom) {
    console.log('first run through');

    console.log(maelstrom[letter]);

    // Access each letter's arrays

    //fix this:
    var array0 = maelstrom[letter][`myArrays${g}`];
    var array1 = maelstrom[letter][`myArrays${o}`];
     console.log(maelstrom[letter][`myArrays${g}`]);
     console.log("\n")
     console.log( maelstrom[letter][`myArrays${o}`]);
     g++;
     o++;
    console.log(":")
    console.log('Calculate the size of array0 and array1')
    var sizeOfArray0 = array0 ? array0.length : 0;
    var sizeOfArray1 = array1 ? array1.length : 0;
     console.log(sizeOfArray0);
     console.log( sizeOfArray1);

    // // Add the size to the letter object
    // maelstrom[letter]['myArrays0'] = sizeOfArray0;
    // maelstrom[letter]['myArrays1'] = sizeOfArray1;
  }

  for (const letter in maelstrom) {
  // console.log(maelstrom[letter]['myArrays0'] );
  // console.log(maelstrom[letter]['myArrays1'] );
  }
  //00 and 01
  //11 do the same thing but 100 multiplied by the difference, normalize if negative



// Usage example:
const loremIpsumText = generateLoremIpsum(3); // Generate three paragraphs of Lorem Ipsum text
//console.log(loremIpsumText);




 return maelstrom

}

function obsidian_printer(){

  //print maelstrom content to a md file

}


function object_stuffer(letter, object){
  //create 4 2d arrays inside the object
  let rows = 4;
  let columns = 4;
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Characters to choose from

  //console.log(letter);
  let myArray = new Array(rows);



  for (let i = 0; i < rows; i++) {
      myArray[i] = new Array(columns);
      ////console.log(myArray[i]);

  }




  for( let x = 0; x < rows ; x++){
    for(let y = 0; y< columns; y++){

      for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);

     }
    // //console.log(result);
      myArray[x][y]=result;
       ////console.log(myArray);
    }


  }

  //console.log("ok");
 // //console.log(myArray[0]);
  ////console.log(myArray[0]);


  ////console.log(myArray[x][0]);

   //console.log(myArray);
   //console.log("//////////////////////");

  // for(let z in myArray ) {

  //   //console.log(` ${myArray[z]} `)
  // }

 // //console.log(`${myArray[0]} + ${letter}`)
 //console.log("my array test 1");
  //console.log(myArray);

   object[`myArrays${x}`] = myArray;

   x++;



  //console.log("my array test 2");
    //console.log(myArray);


    //console.log("my object test 1");
  //console.log(object);

return object;


 ////console.log(object);

  //send back an object whos name is the word, whos array content is filled out
  //grand_object.A.add ^^






}

cambridge_dictionary_catcher('42')
