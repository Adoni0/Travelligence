$("#submitImages").on("click", function (e) {
    e.preventDefault();

    let subscriptionKey = process.env.KEY;
    let endpoint = process.env.ENDPOINT;

    let uriBase = endpoint + "vision/v3.0/analyze";

    // request parameters
    var params = {
        "visualFeatures": "Categories, Description",
        "details": "",
        "language": "en"
    };

    // API call
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // request headers
        beforeSend: function (obj) {
            obj.setRequestHeader("Content-type", "application/json");
            obj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey)
        },
        type: "POST",

    })

});