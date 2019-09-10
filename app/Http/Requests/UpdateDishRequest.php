<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDishRequest extends FormRequest
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
            'name' => 'required|max:100',
            'cal' => 'required|integer',
            'quant' => 'required|integer',
            'pro' => 'integer',
            'lip' => 'integer',
            'glu' => 'integer',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Ce champ est requis',
            'cal.required' => 'Ce champ est requis',
            'quant.required' => 'Ce champ est requis',
            'name.max' => 'Le nom est trop long',
            'cal.integer' => 'La valeur doit être numérique',
            'quant.integer' => 'La valeur doit être numérique',
            'pro.integer' => 'La valeur doit être numérique',
            'lip.integer' => 'La valeur doit être numérique',
            'glu.integer' => 'La valeur doit être numérique',
        ]; // TODO: Change the autogenerated stub
    }
}
