import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onSubmit: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onSubmit }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const containerRef = useRef<HTMLElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: globalThis.MouseEvent) => {
			const target = event.target as Node;

			if (
				containerRef.current &&
				!containerRef.current.contains(target) &&
				arrowButtonRef.current &&
				!arrowButtonRef.current.contains(target)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const handleArrowClick = () => setIsOpen((currentIsOpen) => !currentIsOpen);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onSubmit(defaultArticleState);
	};

	return (
		<>
			<div ref={arrowButtonRef}>
				<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			</div>
			<aside
				ref={containerRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(fontFamilyOption) =>
							setFormState({ ...formState, fontFamilyOption })
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(fontSizeOption) =>
							setFormState({ ...formState, fontSizeOption })
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(fontColor) => setFormState({ ...formState, fontColor })}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(backgroundColor) =>
							setFormState({ ...formState, backgroundColor })
						}
					/>
					<RadioGroup
						title='Ширина контента'
						name='contentWidth'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(contentWidth) =>
							setFormState({ ...formState, contentWidth })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
