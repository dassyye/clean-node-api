import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-erros'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    // sut => system under test
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
})
