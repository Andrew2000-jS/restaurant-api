// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class EntityRoot<_Enitity, PrimitiveData> {
    abstract toPrimitives(): PrimitiveData
}
