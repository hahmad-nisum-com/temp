'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext, Controller } from 'react-hook-form';
import * as z from 'zod';

// Comprehensive list of countries with dial codes
const countries = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', dial: '+93' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', dial: '+355' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', dial: '+213' },
  { code: 'AS', name: 'American Samoa', flag: '🇦🇸', dial: '+1684' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩', dial: '+376' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', dial: '+244' },
  { code: 'AI', name: 'Anguilla', flag: '🇦🇮', dial: '+1264' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', dial: '+1268' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dial: '+54' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', dial: '+374' },
  { code: 'AW', name: 'Aruba', flag: '🇦🇼', dial: '+297' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dial: '+61' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', dial: '+43' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', dial: '+994' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', dial: '+1242' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', dial: '+973' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', dial: '+880' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', dial: '+1246' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', dial: '+375' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', dial: '+32' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', dial: '+501' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', dial: '+229' },
  { code: 'BM', name: 'Bermuda', flag: '🇧🇲', dial: '+1441' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', dial: '+975' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', dial: '+591' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', dial: '+387' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', dial: '+267' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dial: '+55' },
  { code: 'IO', name: 'British Indian Ocean Territory', flag: '🇮🇴', dial: '+246' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', dial: '+673' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', dial: '+359' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', dial: '+226' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', dial: '+257' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', dial: '+855' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', dial: '+237' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dial: '+1' },
  { code: 'CV', name: 'Cape Verde', flag: '🇨🇻', dial: '+238' },
  { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾', dial: '+1345' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', dial: '+236' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', dial: '+235' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', dial: '+56' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dial: '+86' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', dial: '+57' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', dial: '+269' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬', dial: '+242' },
  { code: 'CD', name: 'Congo, Democratic Republic', flag: '🇨🇩', dial: '+243' },
  { code: 'CK', name: 'Cook Islands', flag: '🇨🇰', dial: '+682' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', dial: '+506' },
  { code: 'CI', name: "Cote d'Ivoire", flag: '🇨🇮', dial: '+225' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', dial: '+385' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', dial: '+53' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', dial: '+357' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', dial: '+420' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', dial: '+45' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', dial: '+253' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', dial: '+1767' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', dial: '+1849' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', dial: '+593' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', dial: '+20' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', dial: '+503' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', dial: '+240' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', dial: '+291' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', dial: '+372' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', dial: '+251' },
  { code: 'FK', name: 'Falkland Islands', flag: '🇫🇰', dial: '+500' },
  { code: 'FO', name: 'Faroe Islands', flag: '🇫🇴', dial: '+298' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', dial: '+679' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', dial: '+358' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dial: '+33' },
  { code: 'GF', name: 'French Guiana', flag: '🇬🇫', dial: '+594' },
  { code: 'PF', name: 'French Polynesia', flag: '🇵🇫', dial: '+689' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', dial: '+241' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', dial: '+220' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', dial: '+995' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dial: '+49' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', dial: '+233' },
  { code: 'GI', name: 'Gibraltar', flag: '🇬🇮', dial: '+350' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', dial: '+30' },
  { code: 'GL', name: 'Greenland', flag: '🇬🇱', dial: '+299' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', dial: '+1473' },
  { code: 'GP', name: 'Guadeloupe', flag: '🇬🇵', dial: '+590' },
  { code: 'GU', name: 'Guam', flag: '🇬🇺', dial: '+1671' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', dial: '+502' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', dial: '+224' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', dial: '+245' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', dial: '+592' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', dial: '+509' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', dial: '+504' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', dial: '+852' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', dial: '+36' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', dial: '+354' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dial: '+91' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', dial: '+62' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', dial: '+98' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', dial: '+964' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', dial: '+353' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', dial: '+972' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dial: '+39' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', dial: '+1876' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dial: '+81' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', dial: '+962' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', dial: '+7' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', dial: '+254' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', dial: '+686' },
  { code: 'KP', name: 'Korea, North', flag: '🇰🇵', dial: '+850' },
  { code: 'KR', name: 'Korea, South', flag: '🇰🇷', dial: '+82' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', dial: '+965' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', dial: '+996' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', dial: '+856' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', dial: '+371' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', dial: '+961' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', dial: '+266' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', dial: '+231' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', dial: '+218' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', dial: '+423' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', dial: '+370' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', dial: '+352' },
  { code: 'MO', name: 'Macao', flag: '🇲🇴', dial: '+853' },
  { code: 'MK', name: 'Macedonia', flag: '🇲🇰', dial: '+389' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', dial: '+261' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', dial: '+265' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', dial: '+60' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', dial: '+960' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', dial: '+223' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', dial: '+356' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', dial: '+692' },
  { code: 'MQ', name: 'Martinique', flag: '🇲🇶', dial: '+596' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', dial: '+222' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', dial: '+230' },
  { code: 'YT', name: 'Mayotte', flag: '🇾🇹', dial: '+262' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dial: '+52' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲', dial: '+691' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', dial: '+373' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', dial: '+377' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', dial: '+976' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', dial: '+382' },
  { code: 'MS', name: 'Montserrat', flag: '🇲🇸', dial: '+1664' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', dial: '+212' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', dial: '+258' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', dial: '+95' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', dial: '+264' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷', dial: '+674' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', dial: '+977' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', dial: '+31' },
  { code: 'NC', name: 'New Caledonia', flag: '🇳🇨', dial: '+687' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', dial: '+64' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', dial: '+505' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', dial: '+227' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dial: '+234' },
  { code: 'NU', name: 'Niue', flag: '🇳🇺', dial: '+683' },
  { code: 'NF', name: 'Norfolk Island', flag: '🇳🇫', dial: '+672' },
  { code: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵', dial: '+1670' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', dial: '+47' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', dial: '+968' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', dial: '+92' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼', dial: '+680' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸', dial: '+970' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', dial: '+507' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', dial: '+675' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', dial: '+595' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', dial: '+51' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dial: '+63' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', dial: '+48' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', dial: '+351' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', dial: '+1939' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', dial: '+974' },
  { code: 'RE', name: 'Reunion', flag: '🇷🇪', dial: '+262' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', dial: '+40' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', dial: '+7' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', dial: '+250' },
  { code: 'BL', name: 'Saint Barthélemy', flag: '🇧🇱', dial: '+590' },
  { code: 'SH', name: 'Saint Helena', flag: '🇸🇭', dial: '+290' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', dial: '+1869' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', dial: '+1758' },
  { code: 'MF', name: 'Saint Martin', flag: '🇲🇫', dial: '+590' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', flag: '🇵🇲', dial: '+508' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', dial: '+1784' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸', dial: '+685' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲', dial: '+378' },
  { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹', dial: '+239' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dial: '+966' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', dial: '+221' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', dial: '+381' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', dial: '+248' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', dial: '+232' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dial: '+65' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', dial: '+421' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', dial: '+386' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', dial: '+677' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', dial: '+252' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dial: '+27' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', dial: '+211' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dial: '+34' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', dial: '+94' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', dial: '+249' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷', dial: '+597' },
  { code: 'SZ', name: 'Swaziland', flag: '🇸🇿', dial: '+268' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', dial: '+46' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', dial: '+41' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾', dial: '+963' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', dial: '+886' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', dial: '+992' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', dial: '+255' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', dial: '+66' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', dial: '+670' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', dial: '+228' },
  { code: 'TK', name: 'Tokelau', flag: '🇹🇰', dial: '+690' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴', dial: '+676' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', dial: '+1868' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', dial: '+216' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', dial: '+90' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', dial: '+993' },
  { code: 'TC', name: 'Turks and Caicos Islands', flag: '🇹🇨', dial: '+1649' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', dial: '+688' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', dial: '+256' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dial: '+380' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dial: '+971' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '+44' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dial: '+1' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', dial: '+598' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', dial: '+998' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', dial: '+678' },
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦', dial: '+379' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', dial: '+58' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dial: '+84' },
  { code: 'VG', name: 'Virgin Islands, British', flag: '🇻🇬', dial: '+1284' },
  { code: 'VI', name: 'Virgin Islands, U.S.', flag: '🇻🇮', dial: '+1340' },
  { code: 'WF', name: 'Wallis and Futuna', flag: '🇼🇫', dial: '+681' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', dial: '+967' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', dial: '+260' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', dial: '+263' },
];

// Simplified validation approach that works for international numbers
export const validatePhoneNumber = (phoneNumber: string, countryCode: string): boolean => {
  // Remove all non-digit characters for validation
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Basic validation rules by country/region
  const validationRules: { [key: string]: { min: number; max: number } } = {
    // North America
    '+1': { min: 10, max: 10 },

    // Most European countries
    '+30': { min: 10, max: 10 }, // Greece
    '+31': { min: 9, max: 9 }, // Netherlands
    '+32': { min: 9, max: 9 }, // Belgium
    '+33': { min: 9, max: 9 }, // France
    '+34': { min: 9, max: 9 }, // Spain
    '+39': { min: 9, max: 10 }, // Italy
    '+41': { min: 9, max: 9 }, // Switzerland
    '+43': { min: 10, max: 11 }, // Austria
    '+44': { min: 10, max: 10 }, // UK
    '+45': { min: 8, max: 8 }, // Denmark
    '+46': { min: 9, max: 9 }, // Sweden
    '+47': { min: 8, max: 8 }, // Norway
    '+48': { min: 9, max: 9 }, // Poland
    '+49': { min: 10, max: 11 }, // Germany

    // Asia
    '+81': { min: 10, max: 10 }, // Japan
    '+82': { min: 9, max: 10 }, // South Korea
    '+86': { min: 11, max: 11 }, // China
    '+91': { min: 10, max: 10 }, // India
    '+65': { min: 8, max: 8 }, // Singapore
    '+92': { min: 10, max: 10 }, // Pakistan

    // Australia & Oceania
    '+61': { min: 9, max: 9 }, // Australia
    '+64': { min: 9, max: 9 }, // New Zealand

    // South America
    '+55': { min: 10, max: 11 }, // Brazil
    '+54': { min: 10, max: 11 }, // Argentina
    '+56': { min: 9, max: 9 }, // Chile
    '+57': { min: 10, max: 10 }, // Colombia
    '+58': { min: 10, max: 10 }, // Venezuela

    // Middle East
    '+966': { min: 9, max: 9 }, // Saudi Arabia
    '+971': { min: 9, max: 9 }, // UAE
    '+972': { min: 9, max: 9 }, // Israel
    '+90': { min: 10, max: 10 }, // Turkey
  };

  // Get validation rule for country or use default
  const rule = validationRules[countryCode] || { min: 5, max: 15 };

  // Check if the phone number meets the length requirements
  return digitsOnly.length >= rule.min && digitsOnly.length <= rule.max;
};

// Function to create a dynamic schema based on the selected country
export const createPhoneSchema = (selectedCountryCode: string) => {
  return z.object({
    countryCode: z.string(),
    phoneNumber: z.string().refine((value) => validatePhoneNumber(value, selectedCountryCode), {
      message: 'Invalid phone number format for the selected country.',
    }),
  });
};

export type PhoneInputValue = {
  countryCode: string;
  phoneNumber: string;
};

interface PhoneInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
}

export function PhoneInputField({
  name,
  label = 'Phone Number',
  placeholder = 'Enter phone number',
  description,
  className,
}: PhoneInputProps) {
  const form = useFormContext();

  if (!form) {
    throw new Error('PhoneInputField must be used within a FormProvider');
  }

  const isPhoneFieldInvalid = form?.formState?.errors?.phone;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Controller
              control={form.control}
              name={name}
              render={({ field: { onChange, value, ref } }) => (
                <PhoneInput
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  inputRef={ref}
                />
              )}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {isPhoneFieldInvalid && (
            <FormMessage>{<span>Enter a valid phone number!</span>}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}

interface PhoneInputComponentProps {
  value: PhoneInputValue;
  onChange: (value: PhoneInputValue) => void;
  placeholder?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

const PhoneInput = ({
  value,
  onChange,
  placeholder = 'Enter phone number',
  inputRef,
}: PhoneInputComponentProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.dial === value?.countryCode) ||
      countries.find((c) => c.code === 'US') ||
      countries[0]
  );
  const [phoneNumber, setPhoneNumber] = useState(value?.phoneNumber || '');

  // Create a local ref if no inputRef is provided
  const localInputRef = useRef<HTMLInputElement>(null);

  // Use the provided ref or fall back to local ref
  const inputRefToUse = (inputRef || localInputRef) as React.RefObject<HTMLInputElement>;

  // Initialize with default values if value is undefined
  useEffect(() => {
    if (!value) {
      onChange({
        countryCode: selectedCountry.dial,
        phoneNumber: '',
      });
      return;
    }

    // Update local state when value changes from parent
    if (value.countryCode && value.countryCode !== selectedCountry.dial) {
      const country = countries.find((c) => c.dial === value.countryCode) || selectedCountry;
      setSelectedCountry(country);
    }

    if (value.phoneNumber !== undefined && value.phoneNumber !== phoneNumber) {
      setPhoneNumber(value.phoneNumber);
    }
  }, [value, selectedCountry.dial, phoneNumber, onChange, selectedCountry]);

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    setOpen(false);
    onChange({
      countryCode: country.dial,
      phoneNumber,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;

    // Allow only numbers, spaces, dashes, plus, and parentheses
    if (/^[0-9\s\-+()]*$/.test(newPhoneNumber) || newPhoneNumber === '') {
      setPhoneNumber(newPhoneNumber);
      onChange({
        countryCode: selectedCountry.dial,
        phoneNumber: newPhoneNumber,
      });
    }
  };

  return (
    <div className="flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[130px] justify-between rounded-r-none border-r-0"
            type="button"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-base">{selectedCountry.flag}</span>
              <span>{selectedCountry.dial}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={() => handleCountrySelect(country)}
                    className="flex items-center gap-2"
                  >
                    <span className="text-base">{country.flag}</span>
                    <span className="truncate">{country.name}</span>
                    <span className="ml-auto text-sm text-muted-foreground">{country.dial}</span>
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedCountry.code === country.code ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        ref={inputRefToUse}
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        className="rounded-l-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export { PhoneInput };
