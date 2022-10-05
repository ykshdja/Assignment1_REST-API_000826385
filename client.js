/***
 * @author - Yash Khanduja, 000826385
 * @date - 02/10/2022
 * "StAuth10222: Yash Khanduja, 000826385 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
 *  I have not made my work available to anyone else."
 * 
 * Note to Self - AxiosError: connect ECONNREFUSED ::1:3000 (Start the SQLite Service)
 * 
 */
 const axios = require("axios");

 /**
  *  === TEST #1 ===
  */
 async function Test1()
 {
    /* 1. Execute two POST requests to insert two items into the collection. */
      // First POST request
      const test1Response1 = await axios.post("http://localhost:3000/api", {
        title: "Titanic",
        release_year: "1997",
        time_viewed: "2022-10-03T11:45:56.200",
      });
      console.log(test1Response1.data);
  
      // Second POST request
      const test1Response2 = await axios.post("http://localhost:3000/api", {
        title: "The Godfather ",
        release_year: "1972",
        time_viewed: "2022-10-01T15:20:20.200",
      });
      console.log(test1Response2.data);

    /* 2. Execute a single item PUT request to modify a single item in the collection.*/

    const test1response3 = await axios.put("http://localhost:3000/api/2", {
        title: "Jurassic Park  ",
        release_year: "1993",
        time_viewed: "2022-09-30T12:23:20.120",
      });
      console.log(test1response3.data);

    /** 3.Execute two separate item GET requests to check if each item inserted is correct (remember: check that the field values match what is expected!). */

    const test1Response4 = await axios.get("http://localhost:3000/api/1");
    console.log(test1Response4.data);

    // GET item request for id = 2
    const test1Response5 = await axios.get("http://localhost:3000/api/2");
    console.log(test1Response5.data);

 }

 /**
  * 
  *  === TEST #2 ===
  * 
  */
 
    async function Test2()
    {
        /* 1. Execute a single collection PUT request that replaces the collection with 4 new items. */
        const test2Response1 = await axios.put("http://localhost:3000/api", [
            {
                title: "Harry Potter and the Sorcerer's Stone ",
                release_year: "2001",
                time_viewed: "2022-09-29T12:23:19.150",
            },
            {
                title: "The Dark Knight",
                release_year: "2008",
                time_viewed: "2022-10-01T1:23:20.120",
            },
            {
                title: "Forrest Gump ",
                release_year: "1994",
                time_viewed: "2022-10-02T08:23:19.120",
            },
            {
                title: "The Avengers",
                release_year: "2012",
                time_viewed: "2022-09-30T12:10:04.100",
            },
          ]);
          console.log(test2Response1.data);

          /* 2.Execute a single collection GET request to check if all the items are correct. */
          const test2Response2 = await axios.get("http://localhost:3000/api");
            console.log(test2Response2.data);

        /* 3. Execute a single item DELETE request to delete a single item from the collection. */
        const test2Response3 = await axios.delete("http://localhost:3000/api/4");
        console.log(test2Response3.data);
        
        /* 4. Execute a single collection GET request to check if all the items are correct (3 items). */
        const test2Response4 = await axios.get("http://localhost:3000/api");
        console.log(test2Response4.data);
        
        /* 5. Execute a single collection DELETE request to delete the entire collection. */
        const test2Response5 = await axios.delete("http://localhost:3000/api");
        console.log(test2Response5.data);

        /* 6. Execute a single collection GET request to check if the collection is empty */
        const test2Response6 = await axios.get("http://localhost:3000/api");
        console.log(test2Response6.data);

    }


    Test1();
    Test2();


/* 
 //Get Movies Collection
 async function getMovies()
{
    try{
        const getMovieResponse =  await axios.post("http://localhost:3000/api");
        return getMovieResponse.data;
    }catch(error)
    {
        console.log(error);
    }
}
//GET Movies Item
async function getMovies(id)
{
    try{
        const getMovieResponse =  await axios.post(`http://localhost:3000/api/${id}`);
        return getMovieResponse.data;
    }catch(error)
    {
        console.log(error);
    }
}
*/