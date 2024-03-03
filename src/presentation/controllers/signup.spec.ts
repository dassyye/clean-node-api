import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-erros'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    // sut => system under test
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
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
})
