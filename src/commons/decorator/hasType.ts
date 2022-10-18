import {
  isArray,
  isInt,
  isString,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

const typeValidator = {
  string: function (value: any, args: ValidationArguments) {
    return isString(value);
  },
  int: function (value: any, args: ValidationArguments) {
    return isInt(value);
  },
  'Array<String>': function (value: any, args: ValidationArguments) {
    return isArray(value) && value.some((i) => isString(i));
  },
};

export function IsType(
  types: (keyof typeof typeValidator)[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return types.some((v) => typeValidator[v](value, args));
        },
        defaultMessage(validationArguments?: ValidationArguments) {
          const lastType = types.pop();
          if (types.length == 0) return `Has to be ${lastType}`;
          return `Can only be ${types.join(', ')} or ${lastType}.`;
        },
      },
    });
  };
}
