"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReportingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_reporting_dto_1 = require("./create-reporting.dto");
class UpdateReportingDto extends (0, mapped_types_1.PartialType)(create_reporting_dto_1.CreateReportingDto) {
}
exports.UpdateReportingDto = UpdateReportingDto;
//# sourceMappingURL=update-reporting.dto.js.map