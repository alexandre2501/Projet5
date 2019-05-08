<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDishRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'dishName' => 'required|max:100',
            'dishCal' => 'required|integer',
            'dishQuant' => 'required|integer',
            'dishPro' => 'integer',
            'dishLip' => 'integer',
            'dishGlu' => 'integer',
        ];
    }
}
