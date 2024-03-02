import { SignUpController } from './signup'

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
  })
})
