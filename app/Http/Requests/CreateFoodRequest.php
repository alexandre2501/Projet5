<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFoodRequest extends FormRequest
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
            'foodName' => 'required|max:100',
            'foodCal' => 'required|integer',
            'foodQuant' => 'required|integer',
            'foodPro' => 'integer',
            'foodLip' => 'integer',
            'foodGlu' => 'integer',
        ];
    }
}
