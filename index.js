const puppeteer = require('puppeteer');
let the_links = [];
let counter = 0;
let max =10;
let letter_links = [];




async function run (page_link) {


//sort through links for
//  this extension
  //https://dictionary.cambridge.org/us/browse/english/

  //for each //new section area // make that an object within the object

  // slice off the url up until a point
  // make all left over slices the titles of objects in the grand objects



  // within each


  //

 let grand_object = {}

//  for(x in alphabet)
//     {
//       if ((alphabet[x]) != undefined)
//       {
//         grand_object[alphabet[x]] = {};
//       }
//     }


    const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
    //console.log(await browser.version());
    const page = await browser.newPage();
    await page.goto(page_link);
   //   await page.screenshot({path: 'antiwar.png', fullPage: true});
   const html = await page.content();
    // const title = await page.evaluate(()=> document.title );
    // console.log(title);
    //const text = await page.evaluate(() => document.body.innerText);
    const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));

    // either judge the size of the sheet being filled up and/or wait for  an execution to be done
    for( x in links)
    {

        // console.log(links[x])
        // console.log(the_links)
        the_links= the_links.concat(links[x]);


        //run(links[x]);

    }

    i= 0;

    for( x in links)
    {
      if(links[x].includes('https://dictionary.cambridge.org/us/browse/english/')){
        letter_links[i]= links[x];
        i++;

      }

    }



  //  // https://dictionary.cambridge.org/us/browse/english/
  //   the_links.includes('at');


   // console.log(the_links)

  //  console.log(letter_links);

    function removeDuplicates(data) {
      return data.filter((value, index) => data.indexOf(value) === index);
  }

  letter_links = removeDuplicates(letter_links);


 // console.log(letter_links);

  for( x in letter_links)
    {
      var holder_array;



      holder_array=letter_links[x].split('https://dictionary.cambridge.org/us/browse/english/');
      if(holder_array[0]===holder_array[1]){
        delete letter_links[x];
      }



      // if(links[x]){
      //   letter_links[i]= links[x];
      //   i++;

      // }

    }

   // console.log(letter_links);

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

  for(x in keys)
    {
      ////console.log(grand_object[keys[x]])
      grand_object[keys[x]] = await  object_stuffer(keys[x], grand_object[keys[x]],letter_links[x])

    }





    // keys = Object.keys(grand_object);
    // console.log(keys)

    // for( x in grand_object){

    //   grand_object[x]


    // let rows = grand_object[x].length
    // let columns= 6
    // }



    // grand_object_aftr_enumeration = link_enumerator(grand_object);






  await browser.close();

}




async function the_words_on_the_screen(loaded_array){
  console.log("we are now into sub array fixing ////////////////")
  console.log(loaded_array[0][1])


   // take first link and get all other links found on that page, as other members of the
  //first array


  let  page_url= loaded_array[0][1]
  const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
  //console.log(await browser.version());
  let page = await browser.newPage();
  await page.goto(page_url);
 //   await page.screenshot({path: 'antiwar.png', fullPage: true});
 let html = await page.content();
 console.log(html)
 console.log('\n'+page_url)
  // const title = await page.evaluate(()=> document.title );
  // console.log(title);
  //const text = await page.evaluate(() => document.body.innerText);

  let elements = await page.$$('div.hlh32.han a.tc-bd'); // Select the <a> elements directly
  console.log("Number of elements found: " + elements.length);

  // Extract href attribute from each element
  for (let element of elements) {
      const href = await page.evaluate(el => el.getAttribute('href'), element);
      console.log("Href attribute of element: " + href);
  }

  console.log("we are now into sub array fixing ////////////////")

  // for(x in elements){
  //   elements[x] = href[x]

  //   console.log("x in elements:"+ elements[x])
  // }

  // for (const element of elements) {
  //   // Extract the href attribute from each element
  //   const href = await page.evaluate(el => el.getAttribute('href'), element);
  //   // Push the href attribute into the new_links array
  //   new_links.push(href);

// move these things around, organize, get the words, get their definitions
//load the information back up into the arrays and send them back


  for(let x= 0 ; x< elements.length; x++){
    loaded_array[x][1]=elements[x]








  }

  for(let x= 0 ; x< elements.length; x++){
    loaded_array[x][1]=elements[x]








  }

  console.log("houston, do we have lift off?")
  for(let x= 0 ; x< elements.length; x++){



    //console.log(await browser.version());
    let page = await browser.newPage();
    await page.goto(loaded_array[x][1]);
   //   await page.screenshot({path: 'antiwar.png', fullPage: true});
   const html = await page.content();
    // const title = await page.evaluate(()=> document.title );
    // console.log(title);
    //const text = await page.evaluate(() => document.body.innerText);
    let element = await page.$('def.ddef_d.db');
    //

    console.log("houston, do we have lift off?")
    console.log(element)







  }






}



async function object_stuffer(letter, object, link){

  let new_links = [];
  const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
    //console.log(await browser.version());
    const page = await browser.newPage();
    await page.goto(link);
   //   await page.screenshot({path: 'antiwar.png', fullPage: true});
   const html = await page.content();
    // const title = await page.evaluate(()=> document.title );
    // console.log(title);
    //const text = await page.evaluate(() => document.body.innerText);
    let elements = await page.$$('.hlh32.hdb.dil.tcbd');
    //console.log(elements)

    for (const element of elements) {
      // Extract the href attribute from each element
      const href = await page.evaluate(el => el.getAttribute('href'), element);
      // Push the href attribute into the new_links array
      new_links.push(href);
  }


  for(x in new_links)
  {
    //console.log("newlink: " + new_links[x] )
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
  for (let x = 0; x < rows; x++) {
      loaded_array[x] = []; // Initialize each row as an empty array
  }

  for(let x=0; x< rows; x++){
    loaded_array[x][0]=new_links[x].split('https://dictionary.cambridge.org/us/browse/english/')[1]
    loaded_array[x][1]=new_links[x]


  }

  for(let x=0; x< rows; x++){
  console.log(loaded_array[x][0] + "\n");
  console.log(loaded_array[x][1] );

  }

  // take first link and get all other links found on that page, as other members of the
  //first array

  new_loaded_array = await the_words_on_the_screen(loaded_array)

  //send to another function that goes to that link, gets the word
  // gets the definition

  //gets the etymology from another website

  //later look for synonyms and ayntonyms





// return new_loaded_array
return



}


run('https://dictionary.cambridge.org/us/browse/english/');

console.log(the_links);
