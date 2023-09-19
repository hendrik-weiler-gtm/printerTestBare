chrome.printerProvider.onPrintRequested.addListener(function (job, resultCallback) {
    console.log(job)

    var reader = new FileReader();
    reader.onload = function() {
        console.log('base64 doc', reader.result);
    }
    reader.readAsDataURL(job.document);

    resultCallback('OK');
});

chrome.printerProvider.onGetPrintersRequested.addListener(
    function ( resultCallback ) {
        callbackPrinters= [];
        callbackPrinters.push({
            id: 'printer',
            name: 'Testprinter',
            description: ''
        });      
        resultCallback(callbackPrinters);
    }
);

chrome.printerProvider.onGetCapabilityRequested.addListener(function (printerId, resultCallback) {
    console.log(printerId);

    resultCallback(
        {
            "version": "1.0",
            "printer": {
            "supported_content_type": [
                {"content_type": "application/pdf", "min_version": "1.5"},
                {"content_type": "image/jpeg"},
                {"content_type": "text/plain"}
            ],
            "input_tray_unit": [
                {
                "vendor_id": "tray",
                "type": "INPUT_TRAY"
                }
            ],
            "marker": [
                {
                "vendor_id": "black",
                "type": "INK",
                "color": {"type": "BLACK"}
                },
                {
                "vendor_id": "color",
                "type": "INK",
                "color": {"type": "COLOR"}
                }
            ],
            "cover": [
                {
                "vendor_id": "front",
                "type": "CUSTOM",
                "custom_display_name": "front cover"
                }
            ],
            "vendor_capability": [],
            "color": {
                "option": [
                {"type": "STANDARD_MONOCHROME"},
                {"type": "STANDARD_COLOR", "is_default": true},
                {
                    "vendor_id": "ultra-color",
                    "type": "CUSTOM_COLOR",
                    "custom_display_name": "Best Color"
                }
                ]
            },
            "copies": {
                "default": 1,
                "max": 100
            },
            "media_size": {
                "option": [
                {
                    "name": "ISO_A4",
                    "width_microns": 210000,
                    "height_microns": 297000,
                    "is_default": true
                },
                {
                    "name": "NA_LEGAL",
                    "width_microns": 215900,
                    "height_microns": 355600
                },
                {
                    "name": "NA_LETTER",
                    "width_microns": 215900,
                    "height_microns": 279400
                }
                ]
            }
            }
        }
    );
});