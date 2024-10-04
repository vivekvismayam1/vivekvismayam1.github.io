postOfficefromPin = '';
postOfficefromName = '';
Totaldata = [];
valueEntered = '';
$(document).ready(function() {
    console.log("Test");
    $('#input').keypress(function(e) {
        var key = e.which;
        if (key == 13) // the enter key code
        {
            console.log("enter");
            $("#button").click();

        }
    });
    $("#button").click(function() {
        Totaldata = [];
        valueEntered = $("#input").val();
        console.log("Search for " + valueEntered);
        if (valueEntered == '') {
            alert("Enter some value to search");
        } else {
            $("#spinner").show();

            //Search for Post Offices
            fetch('https://api.postalpincode.in/pincode/' + valueEntered)
                .then(response => response.json())
                .then(data => {
                    console.log("Postoffice data using pincode: " + JSON.stringify(data));
                    postOfficefromPin = data[0].PostOffice;
                    Totaldata = Totaldata.concat(postOfficefromPin);
                    processHTMLFromData();
                }).catch(error => {
                    console.error('There was an error in fetching from pin pincode', error);
                    postOfficefromPin = {};
                });;

            //Search for Postal codes
            fetch('https://api.postalpincode.in/postoffice/' + valueEntered)
                .then(response => response.json())
                .then(data => {
                    console.log("Postoffice data using Name: " + JSON.stringify(data));
                    postOfficefromName = data[0].PostOffice;
                    Totaldata = Totaldata.concat(postOfficefromName);
                    processHTMLFromData();
                }).catch(error => {
                    console.error('There was an error in fetching from name', error);
                    postOfficeResult = {}
                });
        }
    })

    $("#buyMeCoffee").click(function() {
        console.log("Buy Me Coffee");
    });


});

function processHTMLFromData() {
    var allPO = '';
    nullCount = 0;
    console.log("Total data:  " + Totaldata + "  |" + JSON.stringify(Totaldata));
    Totaldata.map((item, index) => {
        if (item != null) {

            if (index % 2 == 0) {
                singlePO = `
            <div class="card text-white bg-dark mb-0 col-md-12">
            <div class="card-header"><b>${item.Name}</b></div>
            <div class="card-body ">
                <p class="card-text"><b>Branch Type:</b> ${item.BranchType} , 
                <b>Circle:</b> ${item.Circle}, <b>District:</b> ${item.District}, <b>Division:</b> ${item.Division},
                <b>Region:</b> ${item.Region}, <b>Block:</b> ${item.Block}, <b>State:</b> ${item.State}, <b>Pincode: ${item.Pincode}</b></p>
            </div>
            </div>`;
            } else {
                singlePO = `
                <div class="card text-white bg-secondary mb-0 col-md-12">
                <div class="card-header "><b>${item.Name}</b></div>
                <div class="card-body ">
                <p class="card-text"><b>Branch Type:</b> ${item.BranchType} , 
                <b>Circle:</b> ${item.Circle}, <b>District:</b> ${item.District}, <b>Division:</b> ${item.Division},
                <b>Region:</b> ${item.Region}, <b>Block:</b> ${item.Block}, <b>State:</b> ${item.State}, <b>Pincode: ${item.Pincode}</b></p>
            </div>
            </div>`;

            }
            allPO += singlePO;
        } else {
            nullCount++;
        }
    });
    if (nullCount == 2) {
        allPO = `
        <div class="card text-dark bg-info mb-3">
  <div class="card-header"><b>Information</b></div>
  <div class="card-body">
    <h5 class="card-title">No results to show</h5>
    <p class="card-text">We didnt find any result for search text entered: ${valueEntered}</p>
  </div>
</div>`;
    }

    $("#displayPO").html(allPO);
    $("#spinner").hide();

}