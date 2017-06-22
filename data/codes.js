'use strict';

const birthCountryCodesJson = require('./codes/birthCountryCodes.json');
const ethnicityCodesJson = require('./codes/ethnicityCodes.json');
const religionCodesJson = require('./codes/religionCodes.json');
const maritalStatusCodesJson = require('./codes/maritalStatusCodes.json');
const nationalityCodesJson = require('./codes/nationalityCodes.json');
const movementDischargeCodesJson = require('./codes/movementDischargeCodes.json');
const movementReturnCodesJson = require('./codes/movementReturnCodes.json');
const hdcStageCodesJson = require('./codes/hdcStageCodes.json');
const hdcStatusCodesJson = require('./codes/hdcStatusCodes.json');
const hdcReasonCodesJson = require('./codes/hdcReasonCodes.json');
const addressCodesJson = require('./codes/addressCodes.json');
const adjudicationChargeCodesJson = require('./codes/adjudicationChargeCodes.json');
const adjudicationOutcomeCodesJson = require('./codes/adjudicationOutcomeCodes.json');
const recallReasonCodesJson = require('./codes/hdcRecallReasonCodesJson.json');
const recallOutcomesCodesJson = require('./codes/hdcRecallOutcomeCodesJson.json');

const codeSets = {
    BIRTH_COUNTRY: birthCountryCodesJson,
    ETHNIC_GROUP: ethnicityCodesJson,
    RELIGION: religionCodesJson,
    MARITAL_STATUS: maritalStatusCodesJson,
    NATIONALITY: nationalityCodesJson,
    MOVEMENT_DISCHARGE: movementDischargeCodesJson,
    MOVEMENT_RETURN: movementReturnCodesJson,
    HDC_STAGE: hdcStageCodesJson,
    HDC_STATUS: hdcStatusCodesJson,
    HDC_REASON: hdcReasonCodesJson,
    ADDRESS: addressCodesJson,
    ADJUDICATION_CHARGE: adjudicationChargeCodesJson,
    ADJUDICATION_OUTCOME: adjudicationOutcomeCodesJson,
    RECALL_REASON: recallReasonCodesJson,
    RECALL_OUTCOME: recallOutcomesCodesJson
};

exports.describeCode = function(codeType, codeValue) {

    const codeSet = codeSets[codeType];

    if (!codeSet || !codeValue) {
        return null;
    }

    let desc = codeSet[codeValue];

    return desc ? desc : null;
};
