package core

type ProxyCheckerError struct {
	IsProxyCheckerError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewProxyCheckerError(code string, msg string, ctx *Context) *ProxyCheckerError {
	return &ProxyCheckerError{
		IsProxyCheckerError: true,
		Sdk:              "ProxyChecker",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ProxyCheckerError) Error() string {
	return e.Msg
}
