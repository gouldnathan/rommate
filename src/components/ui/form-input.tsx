import {Label} from '@radix-ui/react-label'
import {ChangeEventHandler, InputHTMLAttributes} from 'react'
import {Input, PathInput} from './input'
import InputError from './input-error'
import {FieldError, UseFormRegisterReturn} from 'react-hook-form'
import {cn} from '@/lib/utils'
import {Ellipsis} from 'lucide-react'
import {open} from '@tauri-apps/plugin-dialog'

function FormInput({
	register,
	label,
	fieldError,
	className,
	...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
	label: string
	register: UseFormRegisterReturn
	fieldError?: FieldError
}) {
	return (
		<div className={cn('grid', className)}>
			<Label className='text-primary' htmlFor={inputProps.id}>
				{label}
			</Label>
			<Input id={inputProps.id} className='mt-3 text-primary' {...register} {...inputProps} />
			{fieldError && <InputError error={fieldError} />}
		</div>
	)
}

function PathFormInput({
	register,
	label,
	fieldError,
	className,
	onFileSelected,
	onChange,
	value,
	...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
	label: string
	register: UseFormRegisterReturn
	onFileSelected: (path: string | null) => void
	onChange: ChangeEventHandler<HTMLInputElement>
	value: string | null
	fieldError?: FieldError
}) {
	const internalOnClick = async () => {
		const file = await open({
			multiple: false,
			directory: false
		})
		onFileSelected(file)
	}

	return (
		<div className={cn('grid', className)}>
			<Label className='text-primary' htmlFor={inputProps.id}>
				{label}
			</Label>
			<div className='flex'>
				<PathInput value={value} onChange={onChange} />
				<button
					onClick={internalOnClick}
					className="bg-input text-primary shadow-xs h-9 px-4 py-2 has-[>svg]:px-3
						  inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-r-md border border-input border-l-0 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer"
				>
					<Ellipsis />
				</button>
			</div>
			{fieldError && <InputError error={fieldError} />}
		</div>
	)
}

export {FormInput, PathFormInput}
