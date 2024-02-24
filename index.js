const puppeteer = require('puppeteer');
let the_links = [];
let counter = 0;
let max =10;
let letter_links = [];

async function run (page_link)
{
  const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});

  function removeDuplicates(data) {
    return data.filter((value, index) => data.indexOf(value) === index);
}

async function object_stuffer(letter, object, link){
  console.log("Running 'object_stuffer' function... ")

  console.log("Running 'object_stuffer' function.. ")

  console.log("Running 'object_stuffer' function. ")

  console.log("\n")

  let new_links = [];
  const page = await browser.newPage();
  await page.goto(link);
  const html = await page.content();

  let elements = await page.$$('.hlh32.hdb.dil.tcbd');
  for (const element of elements)
    {
      // Extract the href attribute from each element
      const href = await page.evaluate(el => el.getAttribute('href'), element);
      // Push the href attribute into the new_links array
      new_links.push(href);
    }

  //put each word found in each link in an array
  //find definition, etymology, etc of word from internet
  //place that information in other places in array
  //number of rows is equal to the number of links
  let rows = new_links.length;
  let columns = 6; // You mentioned 6, but based on your usage, it seems you need 2 columns.
  // Initialize loaded_array as a two-dimensional array
  let loaded_array = [];
  // Initialize each row of the loaded_array
  for (let x = 0; x < rows; x++)
    {
        loaded_array[x] = []; // Initialize each row as an empty array
    }
  for(let x=0; x< rows; x++)
    {
      loaded_array[x][0]=new_links[x].split('https://dictionary.cambridge.org/us/browse/english/')[1]
      loaded_array[x][1]=new_links[x]
    }

  // take first link and get all other links found on that page, as other members of the
  //first array
  console.log("calling 'the_words_on_the_screen' function... ")

  console.log("\n")



  new_loaded_array = await the_words_on_the_screen(loaded_array)
  //send to another function that goes to that link, gets the word
  // gets the definition
  //gets the etymology from another website
  //later look for synonyms and ayntonyms
  // return new_loaded_array
  return new_loaded_array;
}

async function the_words_on_the_screen(loaded_array)
{
  console.log("Running 'the_words_on_the_screen' function... ")

  console.log("Running 'the_words_on_the_screen' function.. ")

  console.log("Running 'the_words_on_the_screen' function. ")

  console.log("\n")
  column_height = 9; // definition, etymology, synonyms, antonyms, parts of speech, example scentence 0->3
  //take first link and get all other links found on that page, as other members of the first array
  let  page_url= loaded_array[0][1];

  //console.log(await browser.version());
  let page = await browser.newPage();
  await page.goto(page_url);

 //   await page.screenshot({path: 'antiwar.png', fullPage: true});
  let html = await page.content();
 // console.log(html)
  const title = await page.evaluate(()=> document.title );
  const text = await page.evaluate(() => document.body.innerText);
  let elements = await page.$$('div.hlh32.han a.tc-bd'); // Select the <a> elements directly



  let new_loaded_array =[ elements.length];

  for (let x = 0; x < elements.length; x++)
    {
      new_loaded_array[x] = []; // Initialize each row as an empty array
    }

    let p = 0;
    for (let element of elements) {

      const href = await page.evaluate(el => el.getAttribute('href'), element);
      new_loaded_array[p] = 'https://dictionary.cambridge.org' + href;

      p++;

  }



  for(let i= 0; i< new_loaded_array.length; i++ )
{ new_loaded_array[i][1]=  await dictionary_fetcher(new_loaded_array[i])
 new_loaded_array[i][2] = await  etymology_fetcher(new_loaded_array[i])
}

return new_loaded_array

}

async function dictionary_fetcher(link_for_dict)
{
  console.log("link for dict.: " + link_for_dict)

const page = await browser.newPage();
await page.goto(link_for_dict);
//await page.screenshot({path: 'antiwar.png', fullPage: true});
const html = await page.content();
// const title = await page.evaluate(()=> document.title );
// console.log(title);
//const text = await page.evaluate(() => document.body.innerText);

const textContents = await page.evaluate(() => {
  const elements = Array.from(document.querySelectorAll('.def.ddef_d.db')); // Select elements with class 'def ddef_d db'
  return elements.map(element => element.innerText); // Extract innerText from each element
});

console.log(textContents);

//console.log("this will work: " + allText);

return textContents;

}

async function etymology_fetcher(link_for_ety)
 {
  const hasNumbers = (str) => {
    return /\d/.test(str);
  };

  console.log(typeof link_for_ety )
  console.log( link_for_ety )



// Remove the substring
let modifiedLinkForEty = link_for_ety.replace('https://dictionary.cambridge.org/us/dictionary/english/', '');




if((!hasNumbers(modifiedLinkForEty) )&& !(modifiedLinkForEty.includes('-')) ){
  console.log("ety catch successful");

  const page = await browser.newPage();

  await page.goto('https://www.etymonline.com/search?q='+modifiedLinkForEty);
  console.log('https://www.etymonline.com/search?q='+modifiedLinkForEty);

  const html = await page.content();

const title = await page.evaluate(()=> document.title );
console.log(title);
const text = await page.evaluate(() => document.body.innerText);

console.log(text); // Output: 0800 number

// const targetText = await page.evaluate(() => {
//   // Select the element containing the text "0800 number"
//   const element = document.querySelector('.di-title .hw.dhw');

//   // Return the inner text of the selected element
//   return element.innerText.trim();
}
else{

  console.log("ety catch miss");



}


}













  //UI note
  console.log("Running 'run' function... ")

  console.log("Running 'run' function.. ")

  console.log("Running 'run' function. ")

  console.log("\n")

  //grand object holds 26 letter objects which will act as index style folders for all words beginning with that letter
  //variables:
  let grand_object = {}
  i= 0;
  const page = await browser.newPage();
  await page.goto(page_link);
  const html = await page.content();
  const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
  for( let x in links)
  {
    the_links= the_links.concat(links[x]);
  }
  for(let x in links)
  {
    //many links found on page, here we grab only the ones that link to letter subsections
    if(links[x].includes('https://dictionary.cambridge.org/us/browse/english/')){
      letter_links[i]= links[x];
      i++;
    }
  }


  letter_links = removeDuplicates(letter_links);

  for( x in letter_links)
    {
      var holder_array;
      holder_array=letter_links[x].split('https://dictionary.cambridge.org/us/browse/english/');
      https://dictionary.cambridge.org/us/dictionary/english/
      if(holder_array[0]===holder_array[1])
      {
        delete letter_links[x];
        //this is done to get rid of a artifact dont worry, or please understand and fix
      }

    }

    for(let r =0; r<letter_links.length; r++){
      if(letter_links[r]!=undefined)
    {  var holder_array;
      holder_array=letter_links[r].split('https://dictionary.cambridge.org/us/browse/english/');
      grand_object[holder_array[1]] = {};

    }
    }
    keys = Object.keys(grand_object);
    for(let r =0; r<letter_links.length; r++){
    //  console.log("this is a letter link: " + letter_links[r])
    }

    console.log("Running 'run' function... ")

    console.log("Running 'run' function.. ")

    console.log("Running 'run' function. ")

    console.log("\n")

  for(x in keys)
    {
      console.log("calling object stuffer...")

      console.log("\n")

      ////console.log(grand_object[keys[x]])
      grand_object[keys[x]] = await  object_stuffer(keys[x], grand_object[keys[x]],letter_links[x])
    }

    await browser.close();

    console.log("made it to printing")

    const fs = require('fs');

// Assuming grand_object is defined and contains your data

// Define the file path
const filePath = 'output.txt';

// Open the file for writing
const stream = fs.createWriteStream('C:\\Users\\Viridian\\Downloads\\outputty');

// Loop through each object in grand_object
for (let key in grand_object) {
    if (grand_object.hasOwnProperty(key)) {
        const array2D = grand_object[key]; // Access the 2D array

        // Write a label for the current object
        stream.write(`${key}:\n`);

        // Loop through each row of the 2D array
        array2D.forEach(row => {
            // Write the contents of the row to the file
            stream.write(row.join('\t') + '\n');
        });

        // Write a newline character to separate objects
        stream.write('\n');
    }
}

// Close the file stream
stream.end();

console.log('Contents of grand_object have been written to', filePath);

}








// synonyms_fetcher(link_for_syns)
// {console.log("link for dict.: " + link_for_syns)}

// antonyms_fetcher(link_for_ants)
// {console.log("link for dict.: " + link_for_ants)}




run('https://dictionary.cambridge.org/us/browse/english/');
console.log(the_links);
