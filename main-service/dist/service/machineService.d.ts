export declare const createMachine: (data: any) => Promise<any>;
export declare const getAllMachine: () => Promise<any>;
export declare const getMachineById: (id: string) => Promise<any>;
export declare const updateMachine: (id: string, updateData: any) => Promise<import("mongoose").Document<unknown, {}, import("../model/machine.js").IMachine, {}, import("mongoose").DefaultSchemaOptions> & import("../model/machine.js").IMachine & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteMachine: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=machineService.d.ts.map