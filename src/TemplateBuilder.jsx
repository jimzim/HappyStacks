import React, { Component } from 'react';
import { observer } from 'mobx-react';
import defaultTemplates from './templates/default';


export function templateBuilder(templates) {
    var unifiedTemplate = {
        "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {  },//We can add defaults
        "variables": {  },
        "resources": [  ],
        "outputs": {  }
    }

    var count = 0;
    for(var t in defaultTemplates) {
        var template = getLinkedTempates(count++);
        template.properties.templateLink.uri=t.uri;
        unifiedTemplate.resources.push(template);
    }
    return unifiedTemplate;
}


// TODO Ignoring dependencies for now
export function templateBuilder2(templates) {
    // We assume that the schema, content version, and api versions are same.
    // TODO: how to handle virtual networks? How to combine vnets.
    // TODO: we need to handle names which have to be unique if shared(https://azure.microsoft.com/en-us/documentation/articles/resource-manager-template-best-practices/).
    // we are replacing
    var unifiedTemplate = {
        "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {  },//We can add defaults
        "variables": {  },
        "resources": [  ],
        "outputs": {  }
    }


    var parameterInvariants = ["baseurl", "location"];
    var variableInvariants = ["apiVersionCompute", "apiVersionNetwork", "apiVersionStorage", "linkTemplateApiVersion"];

    if(templates == null) {
        templates = defaultTemplates;
    }
    console.log(defaultTemplates);
    var uid = 0;

    templates.forEach( function(t){
        // merge parameters
        var parameters = {};

        for( var attr in t.parameters) {
            var newAttr = attr;
            if(unifiedTemplate.parameters.hasOwnProperty(attr)) {
                newAttr = attr+uid++;
                // TODO we have to make sure that we don't replace some generic template properties
                // by a name match. For instance, parameter, type, name and so on.

                // We don't need to replace the following
                // baseurl, location, Virtual Network name


                t.variables = replace(attr, newAttr, t.variables);
                t.resources = replace(attr, newAttr, t.resources);
                t.output = replace(attr, newAttr, t.outputs);
            }

        }

        // merge variables: When mapping variables we need to be careful about dependencies
        // not all variable names have to be deduplicated. For instance, Vnet's could be shared.
        // Other resources could be shared.
        // In some cases types names have to be changed
    });
    return defaultTemplates[0];
}

// replaces all occurrences in the object
function replace(str, newStr, obj) {
    str = "'"+str+"'";
    newStr = "'"+newStr+"'";
    return JSON.parse(JSON.stringify(obj).replace(RegExp(str, "g"), newStr));
}

function getLinkedTempates(idx) {
    return { 
     "apiVersion": "2015-01-01", 
     "name": "nestedTemplate"+idx, 
     "type": "Microsoft.Resources/deployments", 
     "properties": { 
       "mode": "incremental", 
       "templateLink": {
          "uri": "",
          "contentVersion": "1.0.0.0"
       }, 
       "parameters": { } 
     } 
  } 
}
