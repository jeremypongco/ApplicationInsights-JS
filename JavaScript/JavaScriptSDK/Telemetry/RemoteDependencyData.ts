﻿/// <reference path="../../JavaScriptSDK.Interfaces/Telemetry/ISerializable.ts" />
/// <reference path="../../JavaScriptSDK.Interfaces/Contracts/Generated/PageViewData.ts" />
/// <reference path="../../JavaScriptSDK.Interfaces/Contracts/Generated/RemoteDependencyData.ts"/>
/// <reference path="./Common/DataSanitizer.ts"/>

module Microsoft.ApplicationInsights.Telemetry {
    "use strict";

    export class RemoteDependencyData extends AI.RemoteDependencyData implements ISerializable {

        public static envelopeType = "Microsoft.ApplicationInsights.{0}.RemoteDependency";
        public static dataType = "RemoteDependencyData";

        public aiDataContract = {
            id: FieldType.Required,
            ver: FieldType.Required,
            name: FieldType.Default,
            resultCode: FieldType.Default,
            duration: FieldType.Default,
            success: FieldType.Default,
            data: FieldType.Default,
            target: FieldType.Default,
            type: FieldType.Default,
            properties: FieldType.Default,
            measurements: FieldType.Default,

            kind: FieldType.Required,
            value: FieldType.Default,
            count: FieldType.Default,
            min: FieldType.Default,
            max: FieldType.Default,
            stdDev: FieldType.Default,
            dependencyKind: FieldType.Default,
            async: FieldType.Default,
            dependencySource: FieldType.Default,
            commandName: FieldType.Default,
            dependencyTypeName: FieldType.Default,
        }

        /**
         * Constructs a new instance of the RemoteDependencyData object
         */
        constructor(id: string, absoluteUrl: string, commandName: string, value: number, success: boolean, resultCode: number, method?: string, properties?: Object, measurements?: Object) {
            super();

            this.id = id;
            var parsedUrl: HTMLAnchorElement = UrlHelper.parseUrl(absoluteUrl)
            this.target = parsedUrl.host;
            this.duration = Util.getDurationString(value);
            this.success = success;  
            this.resultCode = resultCode + "";
            this.dependencyKind = AI.DependencyKind.Http;

            this.type = "Ajax";
            this.data = Common.DataSanitizer.sanitizeUrl(commandName);

            if (parsedUrl.pathname != null) {
                var pathName = "/" + parsedUrl.pathname;
                this.name = Common.DataSanitizer.sanitizeString(method ? method + " " + pathName : pathName);
            } else {
                this.name = Common.DataSanitizer.sanitizeString(absoluteUrl);
            }

            this.properties = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
            this.measurements = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeMeasurements(measurements);
        }
    }
}