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
    const { name } = httpRequest.body
    if (!name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      }
    }

    return {
      statusCode: 200,
      body: null,
    }
  }
}
