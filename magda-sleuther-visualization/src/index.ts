import sleuther from "@magda/sleuther-framework/dist/index";
import onRecordFound from './onRecordFound';
import commonYargs from "@magda/sleuther-framework/dist/commonYargs";


const ID = 'sleuther-visualization';
const argv = commonYargs(ID, 6311, "http://localhost:6311");

const aspectDefinition = {
    id: 'visualization-info',
    name: 'Information to power smart visualisations for distributions in the front-end',
    jsonSchema: require("@magda/registry-aspects/visualization-info.schema.json")
};


sleuther({
    argv,
    aspects: ['dcat-distribution-strings'],
    async: true,
    id: ID,
    onRecordFound,
    optionalAspects: [],
    writeAspectDefs: [aspectDefinition],
}).catch((e: Error) => {
    console.error("Error: " + e.message, e);
    process.exit(1);
});
