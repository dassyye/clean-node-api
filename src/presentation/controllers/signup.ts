interface HttpRequest {
  body: {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

export class SignUpController {
  handle(httpRequest: HttpRequest): {
    statusCode: number
    body: Error
  } {
    const { name, email } = httpRequest.body
    if (!name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      }
    }

    if (!email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email'),
      }
    }

    return {
      statusCode: 200,
      body: null,
    }
  }
}
