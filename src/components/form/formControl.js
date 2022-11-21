
import React, { useState } from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


export const FormControl = ({
    // atributes
    type,
    name,
    disabled,
    required,
    requiredName,
    id,
    className,
    align,
    cursor,
    placeholder,
    placeholderLabel,
    colorText,
    colorBack,
    iconImg,
    iconImgHref,
    iconSvg,
    labelTitle,
    automplete,
    maxLength,
    mminLength,
    formId,
    autoFocus,
    onValue,
    pattern,
    title,
    accept,
    // events
    onChange,
    onSelect,
    onClick,
    onBlur,
    onFocus,
    defaultValue,
    multiple,

    iconBtn,
    titleBtn,
    onclickBtn,

    requiredActive
}) => {
    const [showPassword, setshowPassword] = useState(false)
    return (
        <>
            {placeholderLabel && <Label>{placeholderLabel} {required && <small title={requiredName ? requiredName : 'Este campo es Obligatorio'}>*</small>}</Label>}
            <FormControlContainer2
                iconImg={iconImg}
                iconSvg={iconSvg}
                iconBtn={iconBtn}
                type={type}
                disabled={disabled}
                colorText={colorText}
                align={align}
                cursor={cursor}
            >
                {iconImg && <IconImgDiv><Link to={iconImgHref}><img src={iconImg} alt={iconImg} /></Link></IconImgDiv>}
                {iconSvg && <IconSvgDiv><FontAwesomeIcon icon={iconSvg} /></IconSvgDiv>}
                <FormControlMargen>
                    <input
                        className={requiredActive && 'required-active'}
                        type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={onValue}
                        title={title}
                        id={id}
                        name={name}
                        defaultValue={defaultValue}
                        required={required}
                        autoFocus={autoFocus && autoFocus}
                        onChange={onChange}
                        pattern={pattern && pattern}
                        accept={accept}
                        multiple={multiple && multiple}
                        autoComplete={automplete}
                        
                    />
                    {type === 'password' &&
                        <BtnEyed>
                            <span onClick={() => setshowPassword(!showPassword)}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </BtnEyed>
                    }
                    {
                        iconBtn &&
                        <ContainerBtnLeft>
                            <Btn onClick={onclickBtn} title={titleBtn && titleBtn}>
                                <FontAwesomeIcon icon={iconBtn} />
                            </Btn>
                        </ContainerBtnLeft>
                    }
                </FormControlMargen>
            </FormControlContainer2>
        </>
    )
}
export const Combobox = ({
    // atributes
    type,
    name,
    disabled,
    required,
    requiredName,
    id,
    className,
    align,
    cursor,
    placeholder,
    placeholderLabel,
    colorText,
    colorBack,
    iconImg,
    iconImgHref,
    iconSvg,
    labelTitle,
    automplete,
    maxLength,
    mminLength,
    formId,
    autoFocus,
    onValue,
    pattern,
    title,
    // events
    onChange,
    onSelect,
    onClick,
    onBlur,
    onFocus,
    children,

    iconBtn,
    titleBtn,
    onclickBtn
}) => {
    const [showPassword, setshowPassword] = useState(false)
    return (
        <>
            {placeholderLabel && <Label>{placeholderLabel} {required && <small title={requiredName ? requiredName : 'Este campo es Obligatorio'}>*</small>}</Label>}
            <FormControlContainer2
                iconImg={iconImg}
                iconSvg={iconSvg}
                iconBtn={iconBtn}
                type={type}
                disabled={disabled}
                colorText={colorText}
                align={align}
                cursor={cursor}
            >
                {iconImg && <IconImgDiv><a href={iconImgHref}><img src={iconImg} alt={iconImg} /></a></IconImgDiv>}
                {iconSvg && <IconSvgDiv><FontAwesomeIcon icon={iconSvg} /></IconSvgDiv>}
                <FormControlMargen>

                    

                    <select
                        className={className}
                        type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                        placeholder={placeholder}
                        disabled={disabled}
                        defaultValue={onValue}
                        value={onValue}
                        onChange={onChange}
                        title={title}
                        id={id}
                        name={name}
                        required={required}
                        autoComplete={automplete}
                    >
                        {children}
                    </select>

                    {
                        iconBtn &&
                        <ContainerBtnRigth>
                            <Btn onClick={onclickBtn} title={titleBtn && titleBtn}>
                                <FontAwesomeIcon icon={iconBtn} />
                            </Btn>
                        </ContainerBtnRigth>
                    }

                </FormControlMargen>
            </FormControlContainer2>
        </>
    )
}
export const TextArea = ({
    // atributes
    minHeigth,
    type,
    name,
    disabled,
    required,
    requiredName,
    id,
    className,
    align,
    cursor,
    placeholder,
    placeholderLabel,
    colorText,
    colorBack,
    iconImg,
    iconImgHref,
    iconSvg,
    labelTitle,
    automplete,
    maxLength,
    mminLength,
    formId,
    autoFocus,
    onValue,
    pattern,
    title,
    // events
    onChange,
    onSelect,
    onClick,
    onBlur,
    onFocus,
    children
}) => {
    const [showPassword, setshowPassword] = useState(false)
    return (
        <>
            {placeholderLabel && <Label>{placeholderLabel} {required && <small title={requiredName ? requiredName : 'Este campo es Obligatorio'}>*</small>}</Label>}
            <FormControlContainer2
                iconImg={iconImg}
                iconSvg={iconSvg}
                type={type}
                disabled={disabled}
                colorText={colorText}
                colorBack={colorBack}
                align={align}
                cursor={cursor}
                minHeigth={minHeigth}
            >
                {iconImg && <IconImgDiv><a href={iconImgHref}><img src={iconImg} alt={iconImg} /></a></IconImgDiv>}
                {iconSvg && <IconSvgDiv><FontAwesomeIcon icon={iconSvg} /></IconSvgDiv>}
                <FormControlMargen>
                    <textarea
                        className={className}
                        type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={onValue}
                        onChange={onChange}
                        title={title}
                        id={id}
                        name={name}
                        required={required}
                    >
                    </textarea>

                </FormControlMargen>
            </FormControlContainer2>
        </>
    )
}


const ContainerBtnLeft = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
`
const ContainerBtnRigth = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    >div{
        background-color: var(--black-700);
        &:hover{
            background-color: var(--black-800);
        }
    }
`
const Btn = styled.div`
    background-color: var(--black-500);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .1s;
    &:hover{
        background-color: var(--black-700);
    }
    cursor: pointer;
    svg{
        width: 15px;
        height: 15px;
        color: var(--write-400);
    }
`
const FormControlContainer2 = styled.div`
    position: relative;
    input, textarea, select{
        background-color: ${props => props.disabled ? 'var(--black-600)' : 'rgba(28, 28, 29,1)'} ;
        background-color: ${props => props.colorBack && props.colorBack};
        border: 1px solid ${props => props.disabled ? 'var(--black-600)' : 'var(--black-700)'} ;
        outline: 0;
        padding: .4rem .5rem;
        border-radius: .4rem;
        transition: .2s;
        font-size:  var(--size-14);
        color: ${props => props.disabled ? 'var(--write-400)' : 'var(--write-100)'};
        color: ${props => props.colorText && props.colorText };
        width: 100%;
        text-align: ${props => props.align ? props.align : 'left'};
        padding-right: ${props => props.type === 'password' ? '1.8rem' : '.6rem'};
        padding-left: ${props => props.iconImg ? '2.7rem' : '.6rem'};
        /* text-align: ${props => props.iconImg ? 'center' : '0'}; */
        padding-left: ${props => props.iconSvg ? '1.7rem !important' : 'auto'};
        cursor: ${props => props.cursor ? props.cursor : 'text'};
        font-family: Arial, Helvetica, sans-serif;
        box-shadow: 0 0 10px 1px rgba(0,0,0,.1);
        
    &:focus{
        border: 1px solid var(--blue-600);
        box-shadow: 0px 0px 0px 3px rgba(14, 95, 187, .2) inset;
    }
    &:hover{
        /* background-color: ${props => props.disabled ? 'var(--black-600)' : 'rgba(28, 28, 29,.6)'} ; */

        /* border: 1px solid ${props => props.disabled ? 'var(--black-600)' : 'var(--black-800)'} ; */
    }
    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #8A9399;
        opacity: 1; /* Firefox */
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        -webkit-text-fill-color: var(--write-100);
        transition: background-color 5000s;
    }
    }
    input{
        padding-right: ${props => props.iconBtn ? '1.9rem !important' : 'auto'};
        appearance: unset !important;
    }
    select{
        padding: 9px .5rem;
        cursor: pointer;
        border: 1px solid transparent;
        padding-left: ${props => props.iconBtn ? '1.9rem !important' : 'auto'};
        background-color: var(--black-600);
        option{
            background-color: var(--black-400);
        }
        optgroup{
            background-color: var(--black-400);
        }
        &:focus{
            border: 1px solid transparent;
            box-shadow: 0px 0px 0px 0px rgba(14, 95, 187, .2) inset;
        }

    }
    textarea{
        min-height: ${props => props.minHeigth ? props.minHeigth : 'auto'};
        resize: none;
        &::-webkit-scrollbar{
            background-color: transparent;
            width: 10px;
        }
        &::-webkit-scrollbar-thumb{
            background-color: var(--black-900);
            border-radius: 1px;
        }
        &::-webkit-scrollbar-button{

        }
    }
    .select{
        background-color: var(--border-input-hover);
        border: 1px solid transparent;
    }
    .required-active{
        border: 1px solid var(--red-400) !important;
        &:focus{
            box-shadow: 0 0 0 2px rgba( 237, 66, 29, .1) inset;
        }
    }
`
const FormControlMargen = styled.div`
   display: flex;
   flex-direction: row-reverse;
`
const IconImgDiv = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 7px;
    width: 28px;
    height: 28px;
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    a{
        width: 100%;
        height: 100%;
        img{
        width: 100%;
        height: 100%;
    }
    }
`
const IconSvgDiv = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    width: 12px;
    height: 12px;
    color: #a1a6ac;
    display: flex;
    align-items: center;
    svg{
        width: 100%;
        height: 100%;
    }
`
const BtnEyed = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    font-size: 12px;
    color: #a1a6ac;
    width: 13px;
    height: 13px;
    display: flex;
    align-items: center;
    span{
        width: 100%;

        cursor: pointer;
        svg{
            width: 100%;
            height: 100%;
        }
    }
`
const Label = styled.div`
    font-size: var(--size-13);
    margin: 0;
    color: var(--write-300);
    margin-left: 5px;
    text-align: left;
    margin-bottom: 4px;
    small{
        color: red;
        line-height: 1px;
        cursor: pointer;
        font-size: 14px;
    }
`
