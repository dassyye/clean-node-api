import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { EmailValidator } from '../protocols/email-validator'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      console.log(email)

      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()

  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub,
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    // sut => system under test
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: null,
        email: 'jonhdoe@example.com',
        password: 'jonh_password',
        passwordConfirmation: 'jonh_password',
      },
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    // sut => system under test
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Jonh doe',
        email: null,
        password: 'jonh_password',
        passwordConfirmation: 'jonh_password',
      },
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    // sut => system under test
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Jonh doe',
        email: 'jonhdoe@example.com',
        password: null,
        passwordConfirmation: 'jonh_password',
      },
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    // sut => system under test
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Jonh doe',
        email: 'jonhdoe@example.com',
        password: 'jonh_password',
        passwordConfirmation: null,
      },
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    )
  })

  test('Should return 400 if an invalid email is provided', () => {
    // sut => system under test
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'Jonh doe',
        email: 'invalid_email@example.com',
        password: 'jonh_password',
        passwordConfirmation: 'jonh_password',
      },
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})
