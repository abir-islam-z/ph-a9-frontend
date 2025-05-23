class AppException extends Error {
  private _status: number;
  private _message: string;

  constructor(message: string, public status: number) {
    super(message);
    this._message = message;
    this._status = status;
  }
}

export default AppException;
