<?php

namespace App\Traits;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Resources\ErrorResource;

trait FailedValidationTrait
{
    protected function failedValidation(Validator $validator): void
    {
        $errors = (new ErrorResource($validator->errors()->first()))->response()->setStatusCode(422);
        throw new HttpResponseException($errors);
    }
}
