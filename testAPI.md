curl "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBp7deCvfyARrzxkJ1_20OASpZfKobHHRQ&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS"
Returns:
{
  "normalizedInput": {
    "line1": "1263 Pacific Avenue",
    "city": "Kansas City",
    "state": "KS",
    "zip": "66102"
  },
  "kind": "civicinfo#representativeInfoResponse",
  "divisions": {
    "ocd-division/country:us/state:ks/sldu:6": {
      "name": "Kansas State Senate district 6",
      "officeIndices": [
        10
      ]
    },
    "ocd-division/country:us/state:ks/cd:3": {
      "name": "Kansas's 3rd congressional district",
      "officeIndices": [
        3
      ]
    },
    "ocd-division/country:us": {
      "name": "United States",
      "officeIndices": [
        0,
        1
      ]
    },
    "ocd-division/country:us/state:ks/county:wyandotte": {
      "name": "Wyandotte County",
      "officeIndices": [
        13,
        14,
        15,
        16,
        17
      ]
    },
    "ocd-division/country:us/state:ks": {
      "name": "Kansas",
      "officeIndices": [
        2,
        4,
        5,
        6,
        7,
        8,
        9,
        12
      ]
    },
    "ocd-division/country:us/state:ks/county:wyandotte/council_district:2": {
      "name": "Wyandotte County Commissioner District 2",
      "officeIndices": [
        18
      ]
    },
    "ocd-division/country:us/state:ks/sldl:32": {
      "name": "Kansas State House district 32",
      "officeIndices": [
        11
      ]
    },
    "ocd-division/country:us/state:ks/place:kansas_city": {
      "name": "Kansas City city"
    }
  },
  "offices": [
    {
      "name": "President of the United States",
      "divisionId": "ocd-division/country:us",
      "levels": [
        "country"
      ],
      "roles": [
        "headOfGovernment",
        "headOfState"
      ],
      "officialIndices": [
        0
      ]
    },
    {
      "name": "Vice President of the United States",
      "divisionId": "ocd-division/country:us",
      "levels": [
        "country"
      ],
      "roles": [
        "deputyHeadOfGovernment"
      ],
      "officialIndices": [
        1
      ]
    },
    {
      "name": "U.S. Senator",
      "divisionId": "ocd-division/country:us/state:ks",
      "levels": [
        "country"
      ],
      "roles": [
        "legislatorUpperBody"
      ],
      "officialIndices": [
        2,
        3
      ]
    },
    {
      "name": "U.S. Representative",
      "divisionId": "ocd-division/country:us/state:ks/cd:3",
      "levels": [
        "country"
      ],
      "roles": [
        "legislatorLowerBody"
      ],
      "officialIndices": [
        4
      ]
    },
    {
      "name": "Governor of Kansas",
      "divisionId": "ocd-division/country:us/state:ks",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "headOfGovernment"
      ],
      "officialIndices": [
        5
      ]
    },
    {
      "name": "Lieutenant Governor of Kansas",
      "divisionId": "ocd-division/country:us/state:ks",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "deputyHeadOfGovernment"
      ],
      "officialIndices": [
        6
      ]
    },
    {
      "name": "KS Attorney General",
      "divisionId": "ocd-division/country:us/state:ks",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        7
      ]
    },
    {
      "name": "KS State Treasurer",
      "divisionId": "ocd-division/country:us/state:ks",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        8
      ]
    },
    {
      "name": "KS Insurance Commissioner",
      "divisionId": "ocd-division/country:us/state:ks",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        9
      ]
    },
    {
      "name": "KS Secretary of State",
      "divisionId": "ocd-division/country:us/state:ks",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        10
      ]
    },
    {
      "name": "KS State Senator",
      "divisionId": "ocd-division/country:us/state:ks/sldu:6",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "legislatorUpperBody"
      ],
      "officialIndices": [
        11
      ]
    },
    {
      "name": "KS State Representative",
      "divisionId": "ocd-division/country:us/state:ks/sldl:32",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "legislatorLowerBody"
      ],
      "officialIndices": [
        12
      ]
    },
    {
      "name": "KS State Supreme Court Justice",
      "divisionId": "ocd-division/country:us/state:ks",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "judge"
      ],
      "officialIndices": [
        13,
        14,
        15,
        16,
        17,
        18,
        19
      ]
    },
    {
      "name": "Mayor of Wyandotte County-Kansas City Unified Government/CEO",
      "divisionId": "ocd-division/country:us/state:ks/county:wyandotte",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "headOfGovernment"
      ],
      "officialIndices": [
        20
      ]
    },
    {
      "name": "Wyandotte County-Kansas City Unified Government Register of Deeds",
      "divisionId": "ocd-division/country:us/state:ks/county:wyandotte",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        21
      ]
    },
    {
      "name": "Wyandotte County-Kansas City Unified Government District Attorney",
      "divisionId": "ocd-division/country:us/state:ks/county:wyandotte",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        22
      ]
    },
    {
      "name": "Wyandotte County-Kansas City Unified Government Sheriff",
      "divisionId": "ocd-division/country:us/state:ks/county:wyandotte",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        23
      ]
    },
    {
      "name": "Wyandotte County-Kansas City Unified Government Commissioner",
      "divisionId": "ocd-division/country:us/state:ks/county:wyandotte",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "legislatorLowerBody"
      ],
      "officialIndices": [
        24,
        25
      ]
    },
    {
      "name": "Wyandotte County-Kansas City Unified Government Commissioner",
      "divisionId": "ocd-division/country:us/state:ks/county:wyandotte/council_district:2",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "legislatorLowerBody"
      ],
      "officialIndices": [
        26
      ]
    }
  ],
  "officials": [
    {
      "name": "Joseph R. Biden",
      "address": [
        {
          "line1": "1600 Pennsylvania Avenue Northwest",
          "city": "Washington",
          "state": "DC",
          "zip": "20500"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(202) 456-1111"
      ],
      "urls": [
        "https://www.whitehouse.gov/",
        "https://en.wikipedia.org/wiki/Joe_Biden"
      ],
      "channels": [
        {
          "type": "Twitter",
          "id": "potus"
        }
      ]
    },
    {
      "name": "Kamala D. Harris",
      "address": [
        {
          "line1": "1600 Pennsylvania Avenue Northwest",
          "city": "Washington",
          "state": "DC",
          "zip": "20500"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(202) 456-1111"
      ],
      "urls": [
        "https://www.whitehouse.gov/",
        "https://en.wikipedia.org/wiki/Kamala_Harris"
      ],
      "channels": [
        {
          "type": "Twitter",
          "id": "VP"
        }
      ]
    },
    {
      "name": "Jerry Moran",
      "address": [
        {
          "line1": "521 Dirksen Senate Office Building",
          "city": "Washington",
          "state": "DC",
          "zip": "20510"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(202) 224-6521"
      ],
      "urls": [
        "https://www.moran.senate.gov/",
        "https://en.wikipedia.org/wiki/Jerry_Moran"
      ],
      "photoUrl": "http://bioguide.congress.gov/bioguide/photo/M/M000934.jpg",
      "channels": [
        {
          "type": "Facebook",
          "id": "jerrymoran"
        },
        {
          "type": "Twitter",
          "id": "JerryMoran"
        },
        {
          "type": "YouTube",
          "id": "SenatorJerryMoran"
        }
      ]
    },
    {
      "name": "Roger Marshall",
      "address": [
        {
          "line1": "B33",
          "city": "Washington",
          "state": "DC",
          "zip": "20510"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(202) 224-4774"
      ],
      "urls": [
        "https://www.marshall.senate.gov/",
        "https://en.wikipedia.org/wiki/Roger_Marshall_%28politician%29"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "RogerMarshallMD"
        },
        {
          "type": "Twitter",
          "id": "repmarshall"
        }
      ]
    },
    {
      "name": "Sharice Davids",
      "address": [
        {
          "line1": "1541 Longworth House Office Building",
          "city": "Washington",
          "state": "DC",
          "zip": "20515"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(202) 225-2865"
      ],
      "urls": [
        "https://davids.house.gov/",
        "https://en.wikipedia.org/wiki/Sharice_Davids"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "RepDavids"
        },
        {
          "type": "Twitter",
          "id": "RepDavids"
        }
      ]
    },
    {
      "name": "Laura Kelly",
      "address": [
        {
          "line1": "300 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(785) 296-3232"
      ],
      "urls": [
        "https://governor.kansas.gov/",
        "https://en.wikipedia.org/wiki/Laura_Kelly"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "GovLauraKelly"
        },
        {
          "type": "Twitter",
          "id": "GovLauraKelly"
        }
      ]
    },
    {
      "name": "David Toland",
      "address": [
        {
          "line1": "300 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(785) 296-3232"
      ],
      "urls": [
        "https://governor.kansas.gov/about-the-office/lt-governor/",
        "https://en.wikipedia.org/wiki/David_Toland"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "LtGovDavidToland"
        },
        {
          "type": "Twitter",
          "id": "LtGovToland"
        }
      ]
    },
    {
      "name": "Derek Schmidt",
      "address": [
        {
          "line1": "120 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(785) 296-2215"
      ],
      "urls": [
        "https://ag.ks.gov/",
        "https://en.wikipedia.org/wiki/Derek_Schmidt"
      ]
    },
    {
      "name": "Lynn Rogers",
      "address": [
        {
          "line1": "900 Southwest Jackson Street",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(785) 296-3171"
      ],
      "urls": [
        "https://kansasstatestatetreasurer.com/",
        "https://en.wikipedia.org/wiki/Lynn_Rogers_%28politician%29"
      ]
    },
    {
      "name": "Vicki Schmidt",
      "address": [
        {
          "line1": "1300 Southwest Arrowhead Road",
          "city": "Topeka",
          "state": "KS",
          "zip": "66604"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(785) 296-3071"
      ],
      "urls": [
        "https://insurance.kansas.gov/",
        "https://en.wikipedia.org/wiki/Vicki_Schmidt"
      ],
      "emails": [
        "kid.commissioner@ks.gov"
      ]
    },
    {
      "name": "Scott Schwab",
      "address": [
        {
          "line1": "120 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(785) 296-4564"
      ],
      "urls": [
        "https://sos.kansas.gov/",
        "https://en.wikipedia.org/wiki/Scott_Schwab"
      ],
      "emails": [
        "sos@ks.gov"
      ]
    },
    {
      "name": "Pat Pettey",
      "address": [
        {
          "line1": "300 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(785) 296-7375"
      ],
      "urls": [
        "http://www.kslegislature.org/li/b2021_22/members/sen_pettey_pat_1/",
        "https://en.wikipedia.org/wiki/Pat_Pettey"
      ],
      "photoUrl": "http://www.kslegislature.org/li/m/images/pics/sen_pettey_pat_1.jpg",
      "emails": [
        "pat.pettey@senate.ks.gov"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "Senator-Pat-Pettey-178776246078623"
        },
        {
          "type": "Twitter",
          "id": "senatorpettey"
        }
      ]
    },
    {
      "name": "Pam Curtis",
      "address": [
        {
          "line1": "300 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(785) 296-7430"
      ],
      "urls": [
        "http://www.kslegislature.org/li/b2021_22/members/rep_curtis_pam_1/",
        "https://en.wikipedia.org/wiki/Pam_Curtis"
      ],
      "photoUrl": "http://www.kslegislature.org/li/m/images/pics/rep_curtis_pam_1.jpg",
      "emails": [
        "pam.curtis@house.ks.gov"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "PamCurtisKCK"
        },
        {
          "type": "Twitter",
          "id": "pcurtiskck"
        }
      ]
    },
    {
      "name": "Caleb Stegall",
      "address": [
        {
          "line1": "301 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(785) 296-3229"
      ],
      "urls": [
        "https://www.kscourts.org/About-the-Courts/Supreme-Court",
        "https://en.wikipedia.org/wiki/Daniel_Biles"
      ],
      "emails": [
        "info@kscourts.org"
      ]
    },
    {
      "name": "Dan Biles",
      "address": [
        {
          "line1": "301 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(785) 296-3229"
      ],
      "urls": [
        "https://www.kscourts.org/About-the-Courts/Supreme-Court",
        "https://en.wikipedia.org/wiki/Daniel_Biles"
      ],
      "emails": [
        "info@kscourts.org"
      ]
    },
    {
      "name": "Eric S. Rosen",
      "address": [
        {
          "line1": "301 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(785) 296-3229"
      ],
      "urls": [
        "https://www.kscourts.org/About-the-Courts/Supreme-Court",
        "https://en.wikipedia.org/wiki/Eric_Rosen"
      ],
      "emails": [
        "info@kscourts.org"
      ]
    },
    {
      "name": "Evelyn Z. Wilson",
      "address": [
        {
          "line1": "301 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(785) 296-3229"
      ],
      "urls": [
        "https://www.kscourts.org/About-the-Courts/Supreme-Court",
        "https://en.wikipedia.org/wiki/Lee_A._Johnson"
      ],
      "emails": [
        "info@kscourts.org"
      ]
    },
    {
      "name": "Keynen \"KJ\" Wall, Jr.",
      "address": [
        {
          "line1": "301 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(785) 296-3229"
      ],
      "urls": [
        "https://www.kscourts.org/About-the-Courts/Supreme-Court",
        "https://en.wikipedia.org/wiki/K.J._Wall"
      ],
      "emails": [
        "info@kscourts.org"
      ]
    },
    {
      "name": "Marla Luckert",
      "address": [
        {
          "line1": "301 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(785) 296-3229"
      ],
      "urls": [
        "https://www.kscourts.org/About-the-Courts/Supreme-Court",
        "https://en.wikipedia.org/wiki/Marla_Luckert"
      ],
      "emails": [
        "info@kscourts.org"
      ]
    },
    {
      "name": "Melissa Taylor Standridge",
      "address": [
        {
          "line1": "301 Southwest 10th Avenue",
          "city": "Topeka",
          "state": "KS",
          "zip": "66612"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(785) 296-3229"
      ],
      "urls": [
        "https://www.kscourts.org/About-the-Courts/Supreme-Court",
        "https://en.wikipedia.org/wiki/Melissa_Standridge"
      ],
      "emails": [
        "info@kscourts.org"
      ]
    },
    {
      "name": "David Alvey",
      "address": [
        {
          "line1": "701 North 7th Street Trafficway",
          "city": "Kansas City",
          "state": "KS",
          "zip": "66101"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(913) 573-5010"
      ],
      "urls": [
        "https://www.wycokck.org/Mayor.aspx"
      ],
      "emails": [
        "dalvey@wycokck.org"
      ]
    },
    {
      "name": "Nancy W. Burns",
      "address": [
        {
          "line1": "701 North 7th Street Trafficway",
          "city": "Kansas City",
          "state": "KS",
          "zip": "66101"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(913) 573-2841"
      ],
      "urls": [
        "https://www.wycokck.org/Register-of-Deeds.aspx"
      ],
      "emails": [
        "nburns@wycokck.org"
      ]
    },
    {
      "name": "Mark A. Dupree, Sr.",
      "address": [
        {
          "line1": "710 North 7th Street Trafficway",
          "city": "Kansas City",
          "state": "KS",
          "zip": "66101"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(913) 573-2851"
      ],
      "urls": [
        "https://www.wycokck.org/DA.aspx"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "WYCODAOffice"
        },
        {
          "type": "Twitter",
          "id": "wycodaoffice"
        }
      ]
    },
    {
      "name": "Donald Ash",
      "address": [
        {
          "line1": "710 North 7th Street Trafficway",
          "city": "Kansas City",
          "state": "KS",
          "zip": "66101"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(913) 573-2861"
      ],
      "urls": [
        "https://www.wycokck.org/Sheriff.aspx"
      ],
      "emails": [
        "dash@wycokck.org"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "Sheriffnumber1"
        },
        {
          "type": "Twitter",
          "id": "wycosheriff"
        }
      ]
    },
    {
      "name": "Melissa Bynum",
      "address": [
        {
          "line1": "701 North 7th Street Trafficway",
          "city": "Kansas City",
          "state": "KS",
          "zip": "66101"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(913) 573-5040"
      ],
      "urls": [
        "https://www.wycokck.org/Commissioners/Districts.aspx"
      ],
      "emails": [
        "mbynum@wycokck.org"
      ]
    },
    {
      "name": "Tom Burroughs",
      "address": [
        {
          "line1": "701 North 7th Street Trafficway",
          "city": "Kansas City",
          "state": "KS",
          "zip": "66101"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(913) 573-5040"
      ],
      "urls": [
        "https://www.wycokck.org/Commissioners/Districts.aspx"
      ],
      "emails": [
        "tburroughs@wycokck.org"
      ]
    },
    {
      "name": "Brian McKiernan",
      "address": [
        {
          "line1": "701 North 7th Street Trafficway",
          "city": "Kansas City",
          "state": "KS",
          "zip": "66101"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(913) 573-5040"
      ],
      "urls": [
        "https://www.wycokck.org/Commissioners/Districts.aspx"
      ],
      "emails": [
        "bmckiernan@wycokck.org"
      ],
      "channels": [
        {
          "type": "Twitter",
          "id": "bmckiernan_ug2"
        }
      ]
    }
  ]
}

curl "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBp7deCvfyARrzxkJ1_20OASpZfKobHHRQ&address=2210%20Oceanwalk%20Dr.%20W%20Atlantic%20Beach%20FL"
],
      "roles": [
        "legislatorLowerBody"
      ],
      "officialIndices": [
        4
      ]
    },
    {
      "name": "Governor of Florida",
      "divisionId": "ocd-division/country:us/state:fl",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "headOfGovernment"
      ],
      "officialIndices": [
        5
      ]
    },
    {
      "name": "Lieutenant Governor of Florida",
      "divisionId": "ocd-division/country:us/state:fl",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "deputyHeadOfGovernment"
      ],
      "officialIndices": [
        6
      ]
    },
    {
      "name": "FL Commissioner of Agriculture",
      "divisionId": "ocd-division/country:us/state:fl",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        7
      ]
    },
    {
      "name": "FL Chief Financial Officer",
      "divisionId": "ocd-division/country:us/state:fl",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        8
      ]
    },
    {
      "name": "FL Attorney General",
      "divisionId": "ocd-division/country:us/state:fl",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        9
      ]
    },
    {
      "name": "FL State Senator",
      "divisionId": "ocd-division/country:us/state:fl/sldu:4",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "legislatorUpperBody"
      ],
      "officialIndices": [
        10
      ]
    },
    {
      "name": "FL State Representative",
      "divisionId": "ocd-division/country:us/state:fl/sldl:11",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "legislatorLowerBody"
      ],
      "officialIndices": [
        11
      ]
    },
    {
      "name": "FL Supreme Court Justice",
      "divisionId": "ocd-division/country:us/state:fl",
      "levels": [
        "administrativeArea1"
      ],
      "roles": [
        "judge"
      ],
      "officialIndices": [
        12,
        13,
        14,
        15,
        16,
        17,
        18
      ]
    },
    {
      "name": "Mayor of Jacksonville",
      "divisionId": "ocd-division/country:us/state:fl/county:duval",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "headOfGovernment"
      ],
      "officialIndices": [
        19
      ]
    },
    {
      "name": "Duval County Supervisor of Elections",
      "divisionId": "ocd-division/country:us/state:fl/county:duval",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        20
      ]
    },
    {
      "name": "Duval County Tax Collector",
      "divisionId": "ocd-division/country:us/state:fl/county:duval",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        21
      ]
    },
    {
      "name": "Duval County Property Appraiser",
      "divisionId": "ocd-division/country:us/state:fl/county:duval",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        22
      ]
    },
    {
      "name": "Duval County Sheriff",
      "divisionId": "ocd-division/country:us/state:fl/county:duval",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        23
      ]
    },
    {
      "name": "Duval County Clerk of Courts",
      "divisionId": "ocd-division/country:us/state:fl/county:duval",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "governmentOfficer"
      ],
      "officialIndices": [
        24
      ]
    },
    {
      "name": "Jacksonville City Council Member",
      "divisionId": "ocd-division/country:us/state:fl/county:duval",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "legislatorLowerBody"
      ],
      "officialIndices": [
        25,
        26,
        27,
        28,
        29
      ]
    },
    {
      "name": "Jacksonville City Council Member",
      "divisionId": "ocd-division/country:us/state:fl/county:duval/council_district:13",
      "levels": [
        "administrativeArea2"
      ],
      "roles": [
        "legislatorLowerBody"
      ],
      "officialIndices": [
        30
      ]
    }
  ],
  "officials": [
    {
      "name": "Joseph R. Biden",
      "address": [
        {
          "line1": "1600 Pennsylvania Avenue Northwest",
          "city": "Washington",
          "state": "DC",
          "zip": "20500"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(202) 456-1111"
      ],
      "urls": [
        "https://www.whitehouse.gov/",
        "https://en.wikipedia.org/wiki/Joe_Biden"
      ],
      "channels": [
        {
          "type": "Twitter",
          "id": "potus"
        }
      ]
    },
    {
      "name": "Kamala D. Harris",
      "address": [
        {
          "line1": "1600 Pennsylvania Avenue Northwest",
          "city": "Washington",
          "state": "DC",
          "zip": "20500"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(202) 456-1111"
      ],
      "urls": [
        "https://www.whitehouse.gov/",
        "https://en.wikipedia.org/wiki/Kamala_Harris"
      ],
      "channels": [
        {
          "type": "Twitter",
          "id": "VP"
        }
      ]
    },
    {
      "name": "Marco Rubio",
      "address": [
        {
          "line1": "284 Russell Senate Office Building",
          "city": "Washington",
          "state": "DC",
          "zip": "20510"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(202) 224-3041"
      ],
      "urls": [
        "https://www.rubio.senate.gov/",
        "https://en.wikipedia.org/wiki/Marco_Rubio"
      ],
      "photoUrl": "http://bioguide.congress.gov/bioguide/photo/R/R000595.jpg",
      "channels": [
        {
          "type": "Facebook",
          "id": "SenatorMarcoRubio"
        },
        {
          "type": "Twitter",
          "id": "SenRubioPress"
        },
        {
          "type": "YouTube",
          "id": "SenatorMarcoRubio"
        },
        {
          "type": "YouTube",
          "id": "MarcoRubio"
        }
      ]
    },
    {
      "name": "Rick Scott",
      "address": [
        {
          "line1": "716 Hart Senate Office Building",
          "city": "Washington",
          "state": "DC",
          "zip": "20510"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(202) 224-5274"
      ],
      "urls": [
        "https://www.rickscott.senate.gov/",
        "https://en.wikipedia.org/wiki/Rick_Scott"
      ],
      "photoUrl": "http://www.flgov.com/wp-content/uploads/2013/05/GovernorNEW-682x1024.jpg",
      "emails": [
        "Rick.scott@eog.myflorida.com"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "RickScottSenOffice"
        },
        {
          "type": "Twitter",
          "id": "SenRickScott"
        },
        {
          "type": "YouTube",
          "id": "scottforflorida"
        }
      ]
    },
    {
      "name": "John H. Rutherford",
      "address": [
        {
          "line1": "1711 Longworth House Office Building",
          "city": "Washington",
          "state": "DC",
          "zip": "20515"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(202) 225-2501"
      ],
      "urls": [
        "https://rutherford.house.gov/",
        "https://en.wikipedia.org/wiki/John_Rutherford_%28Florida_politician%29"
      ],
      "photoUrl": "http://bioguide.congress.gov/bioguide/photo/R/R000609.jpg",
      "channels": [
        {
          "type": "Facebook",
          "id": "RepRutherfordFL"
        },
        {
          "type": "Twitter",
          "id": "reprutherfordfl"
        }
      ]
    },
    {
      "name": "Ron DeSantis",
      "address": [
        {
          "line1": "400 South Monroe Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(850) 717-9337"
      ],
      "urls": [
        "https://www.flgov.com/",
        "https://en.wikipedia.org/wiki/Ron_DeSantis"
      ],
      "emails": [
        "governorron.desantis@eog.myflorida.com"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "GovRonDeSantis"
        },
        {
          "type": "Twitter",
          "id": "RonDeSantisFL"
        }
      ]
    },
    {
      "name": "Jeanette Nuñez",
      "address": [
        {
          "line1": "400 South Monroe Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(850) 488-7146"
      ],
      "urls": [
        "https://www.flgov.com/lieutenant-governor-jeanette-nunez/",
        "https://en.wikipedia.org/wiki/Jeanette_Nu%C3%B1ez"
      ],
      "emails": [
        "ltgovernorjeanette.nunez@eog.myflorida.com"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "LtGovNunez"
        },
        {
          "type": "Twitter",
          "id": "LtGovNunez"
        }
      ]
    },
    {
      "name": "Nicole \"Nikki\" Fried",
      "address": [
        {
          "line1": "400 S Monroe St",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Democratic Party",
      "phones": [
        "(850) 617-7700"
      ],
      "urls": [
        "https://www.fdacs.gov/",
        "https://en.wikipedia.org/wiki/Nikki_Fried"
      ],
      "emails": [
        "nikki.fried@fdacs.gov"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "FDACS"
        },
        {
          "type": "Twitter",
          "id": "FDACS"
        }
      ]
    },
    {
      "name": "Jimmy Patronis",
      "address": [
        {
          "line1": "200 East Gaines Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(850) 413-3100"
      ],
      "urls": [
        "https://www.myfloridacfo.com/home.html",
        "https://en.wikipedia.org/wiki/Jimmy_Patronis"
      ],
      "emails": [
        "cfo.patronis@myfloridacfo.com"
      ],
      "channels": [
        {
          "type": "Twitter",
          "id": "JimmyPatronis"
        }
      ]
    },
    {
      "name": "Ashley Moody",
      "address": [
        {
          "line1": "400 S Monroe St",
          "line2": "PL",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(866) 966-7226"
      ],
      "urls": [
        "https://myfloridalegal.com/",
        "https://en.wikipedia.org/wiki/Ashley_Moody"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "AshleyMoodyFL"
        },
        {
          "type": "Twitter",
          "id": "AGAshleyMoody"
        }
      ]
    },
    {
      "name": "Aaron Bean",
      "address": [
        {
          "line1": "404 Senate Building",
          "line2": "404 South Monroe Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(850) 487-5004"
      ],
      "urls": [
        "https://www.flsenate.gov/Senators/S4",
        "https://en.wikipedia.org/wiki/Aaron_Bean"
      ],
      "photoUrl": "http://www.flsenate.gov/PublishedContent/Senators/2012-2014/Photos/s04_5094.jpg",
      "emails": [
        "bean.aaron.web@flsenate.gov"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "Aaron-P-Bean-57183058315"
        },
        {
          "type": "Twitter",
          "id": "AaronPBean"
        }
      ]
    },
    {
      "name": "Cord Byrd",
      "address": [
        {
          "line1": "402 South Monroe Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(850) 717-5011"
      ],
      "urls": [
        "https://www.myfloridahouse.gov/Sections/Representatives/details.aspx?MemberId=4632&LegislativeTermId=89",
        "https://en.wikipedia.org/wiki/Cord_Byrd"
      ],
      "photoUrl": "http://www.myfloridahouse.gov/FileStores/Web/Imaging/Member/4632.jpg",
      "emails": [
        "cord.byrd@myfloridahouse.gov"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "votecordbyrd"
        },
        {
          "type": "Facebook",
          "id": "cord.byrd"
        },
        {
          "type": "Twitter",
          "id": "CordByrd"
        }
      ]
    },
    {
      "name": "Alan Lawson",
      "address": [
        {
          "line1": "500 South Duval Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(850) 921-1096"
      ],
      "urls": [
        "https://www.floridasupremecourt.org/Justices/Justice-Alan-Lawson",
        "https://en.wikipedia.org/wiki/C._Alan_Lawson"
      ],
      "emails": [
        "publicinformation@flcourts.org"
      ]
    },
    {
      "name": "Carlos G. Muñiz",
      "address": [
        {
          "line1": "500 South Duval Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(850) 488-0007"
      ],
      "urls": [
        "https://www.floridasupremecourt.org/Justices/Justice-Carlos-G.-Muniz",
        "https://en.wikipedia.org/wiki/Carlos_G._Mu%C3%B1iz"
      ],
      "emails": [
        "publicinformation@flcourts.org"
      ]
    },
    {
      "name": "Charles T. Canady",
      "address": [
        {
          "line1": "500 South Duval Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(850) 410-8092"
      ],
      "urls": [
        "https://www.floridasupremecourt.org/Justices/Chief-Justice-Charles-T.-Canady",
        "https://en.wikipedia.org/wiki/Charles_T._Canady"
      ],
      "emails": [
        "publicinformation@flcourts.org"
      ]
    },
    {
      "name": "Jamie R. Grosshans",
      "address": [
        {
          "line1": "500 South Duval Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(850) 488-8421"
      ],
      "urls": [
        "https://www.floridasupremecourt.org/Justices/Justice-Jamie-R.-Grosshans",
        "https://en.wikipedia.org/wiki/Jamie_Grosshans"
      ],
      "emails": [
        "publicinformation@flcourts.org"
      ]
    },
    {
      "name": "John D. Couriel",
      "address": [
        {
          "line1": "500 South Duval Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(850) 922-5624"
      ],
      "urls": [
        "https://www.floridasupremecourt.org/Justices/Justice-John-D.-Couriel",
        "https://en.wikipedia.org/wiki/John_D._Couriel"
      ],
      "emails": [
        "publicinformation@flcourts.org"
      ]
    },
    {
      "name": "Jorge Labarga",
      "address": [
        {
          "line1": "500 South Duval Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(850) 413-8371"
      ],
      "urls": [
        "https://www.floridasupremecourt.org/Justices/Justice-Jorge-Labarga",
        "https://en.wikipedia.org/wiki/Jorge_Labarga"
      ],
      "emails": [
        "publicinformation@flcourts.org"
      ]
    },
    {
      "name": "Ricky Polston",
      "address": [
        {
          "line1": "500 South Duval Street",
          "city": "Tallahassee",
          "state": "FL",
          "zip": "32399"
        }
      ],
      "party": "Nonpartisan",
      "phones": [
        "(850) 488-2361"
      ],
      "urls": [
        "https://www.floridasupremecourt.org/Justices/Justice-Ricky-Polston",
        "https://en.wikipedia.org/wiki/Ricky_Polston"
      ],
      "emails": [
        "publicinformation@flcourts.org"
      ]
    },
    {
      "name": "Lenny Curry",
      "address": [
        {
          "line1": "117 West Duval Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 255-5000"
      ],
      "urls": [
        "https://www.coj.net/mayor-curry.aspx"
      ],
      "emails": [
        "mayorlennycurry@coj.net"
      ]
    },
    {
      "name": "Mike Hogan",
      "address": [
        {
          "line1": "105 East Monroe Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 630-1414"
      ],
      "urls": [
        "http://www.duvalelections.com/"
      ],
      "emails": [
        "mhogan@coj.net"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "100017811298"
        },
        {
          "type": "Twitter",
          "id": "duvalcountysoe"
        }
      ]
    },
    {
      "name": "Jim Overton",
      "address": [
        {
          "line1": "231 East Forsyth Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 255-5700"
      ],
      "urls": [
        "https://taxcollector.coj.net/"
      ],
      "emails": [
        "taxcollector@coj.net"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "duvalcountytaxcollector"
        },
        {
          "type": "Twitter",
          "id": "DuvalTaxCollect"
        }
      ]
    },
    {
      "name": "Jerry Holland",
      "address": [
        {
          "line1": "231 East Forsyth Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 630-2011"
      ],
      "urls": [
        "http://www.coj.net/departments/property-appraiser.aspx"
      ],
      "emails": [
        "jholland@coj.net"
      ]
    },
    {
      "name": "Mike Williams",
      "address": [
        {
          "line1": "501 East Bay Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 630-0500"
      ],
      "urls": [
        "http://www.jaxsheriff.org/"
      ],
      "channels": [
        {
          "type": "Facebook",
          "id": "JacksonvilleSheriffsOffice"
        },
        {
          "type": "Twitter",
          "id": "JSOPIO"
        }
      ]
    },
    {
      "name": "Jody Phillips",
      "address": [
        {
          "line1": "501 West Adams Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(352) 498-1200"
      ],
      "urls": [
        "https://www2.duvalclerk.com/"
      ],
      "emails": [
        "public.info@duvalclerk.com"
      ]
    },
    {
      "name": "Matt Carlucci",
      "address": [
        {
          "line1": "117 West Duval Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 255-5200"
      ],
      "urls": [
        "https://www.coj.net/city-council.aspx"
      ],
      "emails": [
        "mcarlucci@coj.net"
      ]
    },
    {
      "name": "Ronald B. Salem",
      "address": [
        {
          "line1": "117 West Duval Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 255-5200"
      ],
      "urls": [
        "https://www.coj.net/city-council.aspx"
      ],
      "emails": [
        "rsalem@coj.net"
      ]
    },
    {
      "name": "Samuel Newby",
      "address": [
        {
          "line1": "117 West Duval Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 255-5200"
      ],
      "urls": [
        "https://www.coj.net/city-council.aspx"
      ],
      "emails": [
        "snewby@coj.net"
      ]
    },
    {
      "name": "Terrance Freeman",
      "address": [
        {
          "line1": "117 West Duval Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 255-5200"
      ],
      "urls": [
        "https://www.coj.net/city-council.aspx"
      ],
      "emails": [
        "tfreeman@coj.net"
      ]
    },
    {
      "name": "VACANT",
      "address": [
        {
          "line1": "117 West Duval Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Unknown",
      "phones": [
        "(904) 255-5200"
      ],
      "urls": [
        "https://www.coj.net/city-council.aspx"
      ]
    },
    {
      "name": "Rory Diamond",
      "address": [
        {
          "line1": "117 West Duval Street",
          "city": "Jacksonville",
          "state": "FL",
          "zip": "32202"
        }
      ],
      "party": "Republican Party",
      "phones": [
        "(904) 255-5200"
      ],
      "urls": [
        "https://www.coj.net/city-council.aspx"
      ],
      "emails": [
        "rdiamond@coj.net"
      ]
    }
  ]
}