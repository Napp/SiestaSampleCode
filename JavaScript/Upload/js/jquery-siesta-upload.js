// This is just a wrapper for jQuery, pay no attention to it.
(function($) {
    function uploadToSiesta(args) {
        args            = args || {};
        var apikey      = args.apikey || "";
        var account     = args.accountName || "";
        var fileType    = args.fileType || "publication";
        var file        = args.file || {};
        var successCallback = args.success || function(){};
        var errorCallback = args.error || function(){};

        $.ajax({
            // We have a separate API for uploading images and publications
            url: "https://" + account + ".nappsiesta.com/api/v1/file/upload/" + fileType,
            type: "GET",
            dataType: "json",
            // Remember to set the headers whenever you communicate with Siesta
            headers: {
                "X-NAPP-APP-ID": "Siesta",
                "X-NAPP-API-KEY": apikey
            },
            success: upload
        });

        // Function called when the upload credentials are fetched
        function upload(data) {
            var form = data.form;
            // Generate the FormData object needed to upload the file
            var formData = generateFormData(form);
            // Append the selected file to the form data
            formData.append('file', file[0].files[0]);

            // Send the upload request to our file server
            $.ajax({
                url: data.url,
                type: "POST",
                data: formData,
                // Don't cache the upload request
                cache: false,
                // Don't set a content type
                contentType: false,
                // Don't process the formData, it's correct - trust me
                processData: false,
                success: successCallback,
                error: errorCallback
            });
        }

        /**
        * Generate the FormData object needed to upload the file
        *
        * We do this because we don't want jQuery to process the POST data,
        * we know that it's correct.
        */
        function generateFormData(form) {
            var formData = new FormData();

            $.each(form, function(index, item) {
                formData.append(index, item);
            });

            return formData;
        }
    }
})(jQuery);
