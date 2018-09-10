
import fetch from 'cross-fetch'
import {store} from '../index'
import {TreeAlgorithms} from './tree.js'
import accountTemplate from './accounttemplate';
import graphTemplate from './graphtemplate';


const access_header = "x-access-token"




const apiurl = "https://www.bixzit.com"




export class BixitApi{

    static socket;


    static connectCube(){
        this.socket = new WebSocket("wss://localhost:8080");
        return new Promise((accept, reject) => {
            accept("open");
            // this.socket.onopen = () => { accept("open")};
        });
    }



    static queryCube(s){
        var p = new Promise((accept, reject) => {

            accept([]);

            this.socket.onmessage = function(e){
                var res = JSON.parse(e.data);
                accept(res);
            }
        });

        //this.socket.send(s)

        return p;
    }



    static login(username, password){
        return fetch(apiurl + "/api/auth",{
            method: 'POST',
            body: JSON.stringify({userId: username, password: password }),
            headers:{
                'Content-Type': 'application/json'
              }
        })
        .then(
            res => { 
                return [];
                /*
                if(res.ok)
                    return res.json()
                else
                    throw new Error("autentication error")
                    */
            }
        );
    }



    static getTimeDim(){
        return fetch(apiurl + "/api/dim/time",{
            method: 'GET',
            body: "",
            headers:{
                [access_header]:  store.getState().auth.token
              }
        }) 
        .then(
            res => { 
                if(res.ok)
                    return res.json()
                else
                    throw new Error("cant get time data from api, server down ?")
            }
        )
        .then( 
            // convert list from API to the tree structure used in this app
            json => TreeAlgorithms.getTreeFromList(json, "id", "parentId", "", "description")            
        );
    }


    
    static getOrgUnitsDim(){
        return fetch(apiurl + "/api/dim/profitcenters",{
            method: 'GET',
            body: "",
            headers:{
                [access_header]:  store.getState().auth.token
              }
        }) 
        .then(
            res => { 
                if(res.ok)
                    return res.json()
                else
                    throw new Error("cant get org units data from api, server down ?")
            }
        )
        .then( 
            // convert list from API to the tree structure used in this app
            json => TreeAlgorithms.getTreeFromList(json, "profitCenter", "parentProfitCenter", "", "profitCenterDescription")            
        );
    }



    static getAccountsData(month, unit){

        return new Promise((accept, reject) => {
            let testData = [...accountTemplate]

            // just make random numbers and pretend it is from back-end

            testData[1].actual = 9000 + Math.round(Math.random()*2000)
            testData[1].budget = 8500 + Math.round(Math.random()*2000)
            testData[1].deviation = testData[1].actual  - testData[1].budget 

            testData[4].actual = 6000 + Math.round(Math.random()*1000)
            testData[5].actual = 1000 + Math.round(Math.random()*500)
            testData[6].actual = 100 + Math.round(Math.random()*500)

            testData[4].budget = 6000 + Math.round(Math.random()*1000) - 750
            testData[5].budget = 1000 + Math.round(Math.random()*500) -250
            testData[6].budget = 100 + Math.round(Math.random()*500) -80

            testData[7].actual = testData[4].actual + testData[5].actual + testData[6].actual
            testData[7].budget = testData[4].budget + testData[5].budget + testData[6].budget


            testData[9].actual = testData[1].actual - testData[7].actual
            testData[9].budget = testData[1].budget - testData[7].budget            
            
            testData[12].actual = 200 + Math.round(Math.random()*30)
            testData[13].actual = 100 + Math.round(Math.random()*30)
            testData[12].budget = 200 + Math.round(Math.random()*30) - 15
            testData[13].budget = 100 + Math.round(Math.random()*30) - 15

            testData[14].actual = testData[12].actual - testData[13].actual
            testData[14].budget = testData[12].budget - testData[13].budget            

            testData[16].actual = testData[9].actual - testData[14].actual
            testData[16].budget = testData[9].budget - testData[14].budget            


            testData[1].deviation = testData[1].actual  - testData[1].budget 
            testData[4].deviation = testData[4].actual  - testData[4].budget 
            testData[5].deviation = testData[5].actual  - testData[5].budget 
            testData[6].deviation = testData[6].actual  - testData[6].budget 
            testData[7].deviation = testData[7].actual  - testData[7].budget 
            testData[9].deviation = testData[9].actual  - testData[9].budget 
            testData[12].deviation = testData[12].actual  - testData[12].budget 
            testData[13].deviation = testData[13].actual  - testData[13].budget 
            testData[14].deviation = testData[14].actual  - testData[14].budget 
            testData[16].deviation = testData[16].actual  - testData[16].budget 

            // a little delay to pretend back-end is fetching data
            setTimeout(()=> accept(testData),1000)            
        });
    }



    static getGraphData(month, unit){
        return new Promise((accept, reject) => {

            // get a copy of graphTemplate that is recognized as mutated
            let testData = {
                data: {...graphTemplate.data},
                options: {...graphTemplate.options},
            }        
            testData.data.labels = ["","",""] 
            testData.data.datasets[0].data = [0,0,0];
            testData.data.datasets[1].data = [0,0,0];

            // just mock up data and captions

            let currMonth = Number(month.substr(month.length -2))
            let currYear = Number(month.substr(0, 4))

            let monthLookup = [
                "Januar",
                "Februar",
                "Mars",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Desember"
            ];

            testData.data.labels[2] = monthLookup[currMonth-1] + " " + currYear.toString()

            currMonth = currMonth -1
            if(currMonth===0){
                currMonth = 12
                currYear = currYear - 1
            }
            testData.data.labels[1] = monthLookup[currMonth-1] + " " + currYear.toString()

            currMonth = currMonth -1
            if(currMonth===0){
                currMonth = 12
                currYear = currYear - 1
            }
            testData.data.labels[0] = monthLookup[currMonth-1] + " " + currYear.toString()

            for(var i=0; i<3; i++){
                testData.data.datasets[0].data[i] = 8000 + Math.round(Math.random()*3000)
                testData.data.datasets[1].data[i] = 1500 + Math.round(Math.random()*500)
            }

            // a little delay to pretend back-end is fetching data
            setTimeout(()=> accept(testData),1000)            
        });
    }

}

export default BixitApi;
