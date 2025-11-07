import {FieldErrors, UseFormRegister} from 'react-hook-form'
import {FormInput, PathFormInput} from '@/components/ui/form-input'
import {RetroarchConfigInputs} from './platform-configure'
import {useState} from 'react'

export function RetroarchConfigForm({
	register,
	errors
}: {
	register: UseFormRegister<RetroarchConfigInputs>
	errors: FieldErrors<RetroarchConfigInputs>
}) {
	const [executablePath, setExecutablePath] = useState<string>('')

	const setPath = (e: string | null) => {
		const nonNull = e ?? ''
		setExecutablePath(nonNull)
	}

	return (
		<div className='grid grid-cols-6 gap-6'>
			<PathFormInput
				className='col-start-1 col-span-3'
				label='Executable Path'
				id='executable-path'
				onFileSelected={setPath}
				onChange={(e) => setExecutablePath(e.target.value)}
				value={executablePath}
				register={register('executablePath', {required: true})}
				fieldError={errors.executablePath}
			/>
			<FormInput
				className='col-start-1 col-span-2'
				label='Core'
				id='core'
				register={register('core', {required: true})}
				fieldError={errors.core}
			/>
			<FormInput
				className='col-start-1 col-span-2'
				label='Extra Arguments'
				id='args'
				register={register('args')}
				fieldError={errors.args}
			/>
		</div>
	)
}
