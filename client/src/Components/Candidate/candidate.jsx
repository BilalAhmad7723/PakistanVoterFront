import { React, useState, useEffect } from "react";
import http from "../../apiConfig";
import Select from 'react-select'
import { useForm, Controller } from "react-hook-form";
import { Form,Col, Row, Container, Button, Table, Modal, Pagination} from "react-bootstrap";
import { Empty,Spin,Badge } from "antd";
import { Popconfirm, message } from "antd";
//import Select from 'react-select';
const ConstituencyArray =  [
  {
      "label": "Select your Constiuency",
      "value": "nothing"
  },
  {
      "label": "--Don't Remember--",
      "value": "Not Known"
  },
  {
      "label": "Khyber Pukhtunkhwa",
      "value": "KPK start"
  },
  {
      "label": "NA-1 Chitral",
      "value": "NA-1"
  },
  {
      "label": "NA-2 Swat-I",
      "value": "NA-2"
  },
  {
      "label": "NA-3 Swat-II",
      "value": "NA-3"
  },
  {
      "label": "NA-4 Swat-III",
      "value": "NA-4"
  },
  {
      "label": "NA-5 Upper Dir",
      "value": "NA-5"
  },
  {
      "label": "NA-6 Lower Dir-I",
      "value": "NA-6"
  },
  {
      "label": "NA-7 Lower Dir-II",
      "value": "NA-7"
  },
  {
      "label": "NA-8 Malakand Protected Area",
      "value": "NA-8"
  },
  {
      "label": "NA-9 Buner",
      "value": "NA-9"
  },
  {
      "label": "NA-10 Shangla",
      "value": "NA-10"
  },
  {
      "label": "NA-11 Kohistan-cum-Lower Kohistan-cum-Kolai Pallas Kohistan",
      "value": "NA-11"
  },
  {
      "label": "NA-12 Battagram",
      "value": "NA-12"
  },
  {
      "label": "NA-13 Mansehra-I",
      "value": "NA-13"
  },
  {
      "label": "NA-14 Mansehra-cum-Torghar",
      "value": "NA-14"
  },
  {
      "label": "NA-15 Abbottabad-I",
      "value": "NA-15"
  },
  {
      "label": "NA-16 Abbottabad-II",
      "value": "NA-16"
  },
  {
      "label": "NA-17 Haripur-I",
      "value": "NA-17"
  },
  {
      "label": "NA-18 Swabi-I",
      "value": "NA-18"
  },
  {
      "label": "NA-19 Swabi-II",
      "value": "NA-19"
  },
  {
      "label": "NA-20 Mardan-I",
      "value": "NA-20"
  },
  {
      "label": "NA-21 Mardan-II",
      "value": "NA-21"
  },
  {
      "label": "NA-22 Mardan-III",
      "value": "NA-22"
  },
  {
      "label": "NA-23 Charsadda-I",
      "value": "NA-23"
  },
  {
      "label": "NA-24 Charsadda-II",
      "value": "NA-24"
  },
  {
      "label": "NA-25 Nowshera-I",
      "value": "NA-25"
  },
  {
      "label": "NA-26 Nowshera-II",
      "value": "NA-26"
  },
  {
      "label": "NA-27 Peshawar-I",
      "value": "NA-27"
  },
  {
      "label": "NA-28 Peshawar-II",
      "value": "NA-28"
  },
  {
      "label": "NA-29 Peshawar-III",
      "value": "NA-29"
  },
  {
      "label": "NA-30 Peshawar-IV",
      "value": "NA-30"
  },
  {
      "label": "NA-31 Peshawar-V",
      "value": "NA-31"
  },
  {
      "label": "NA-32 Koha",
      "value": "NA-32"
  },
  {
      "label": "NA-33 Hangu",
      "value": "NA-33"
  },
  {
      "label": "NA-34 Karak",
      "value": "NA-34"
  },
  {
      "label": "NA-35 Bannu",
      "value": "NA-35"
  },
  {
      "label": "NA-36 Lakki Marwat",
      "value": "NA-36"
  },
  {
      "label": "NA-37 Tank",
      "value": "NA-37"
  },
  {
      "label": "NA-38 Dera Ismail Khan-I",
      "value": "NA-38"
  },
  {
      "label": "NA-39 Dera Ismail Khan-II",
      "value": "NA-39"
  },
  {
      "label": "NA-40 Bajaur Agency-I Tribal Area-I",
      "value": "NA-40"
  },
  {
      "label": "NA-41 Bajaur Agency-II Tribal Area-II",
      "value": "NA-41"
  },
  {
      "label": "NA-42 Mohmand Agency Tribal Area-III",
      "value": "NA-42"
  },
  {
      "label": "NA-43 Khyber Agency-I Tribal Area-IV",
      "value": "NA-43"
  },
  {
      "label": "NA-44 Khyber Agency-II Tribal Area-V",
      "value": "NA-44"
  },
  {
      "label": "NA-45 Kurram Agency-I Tribal Area-VI",
      "value": "NA-45"
  },
  {
      "label": "NA-46 Kurram Agency-II Tribal Area-VII",
      "value": "NA-46"
  },
  {
      "label": "NA-47 Orakzai Agency Tribal Area-VIII",
      "value": "NA-47"
  },
  {
      "label": "NA-48 North Waziristan Agency Tribal Area-IX",
      "value": "NA-48"
  },
  {
      "label": "NA-49 South Waziristan Agency-I Tribal Area-X",
      "value": "NA-49"
  },
  {
      "label": "NA-50 South Waziristan Agency-II Tribal Area-XI",
      "value": "NA-50"
  },
  {
      "label": "NA-51 FR Tribal Area-XII",
      "value": "NA-51"
  },
  {
      "label": "Federal",
      "value": "Federal start"
  },
  {
      "label": "NA-52 ICT-I",
      "value": "NA-52"
  },
  {
      "label": "NA-53 ICT-II",
      "value": "NA-53"
  },
  {
      "label": "NA-54 ICT-III",
      "value": "NA-54"
  },
  {
      "label": "Punjab",
      "value": ""
  },
  {
      "label": "NA-55 Attock-I",
      "value": "NA-55"
  },
  {
      "label": "NA-56 Attock-II",
      "value": "NA-56"
  },
  {
      "label": "NA-57 Rawalpindi-I",
      "value": "NA-57"
  },
  {
      "label": "NA-58 Rawalpindi-II",
      "value": "NA-58"
  },
  {
      "label": "NA-59 Rawalpindi-III",
      "value": "NA-59"
  },
  {
      "label": "NA-60 Rawalpindi-IV",
      "value": "NA-60"
  },
  {
      "label": "NA-61 Rawalpindi-V",
      "value": "NA-61"
  },
  {
      "label": "NA-62 Rawalpindi-VI",
      "value": "NA-62"
  },
  {
      "label": "NA-63 Rawalpindi-VII",
      "value": "NA-63"
  },
  {
      "label": "NA-64 Chakwal-I",
      "value": "NA-64"
  },
  {
      "label": "NA-65 Chakwal-II",
      "value": "NA-65"
  },
  {
      "label": "NA-66 Jhelum-I",
      "value": "NA-66"
  },
  {
      "label": "NA-67 Jhelum-II",
      "value": "NA-67"
  },
  {
      "label": "NA-68 Gujrat-I",
      "value": "NA-68"
  },
  {
      "label": "NA-69 Gujrat-II",
      "value": "NA-69"
  },
  {
      "label": "NA-70 Gujrat-III",
      "value": "NA-70"
  },
  {
      "label": "NA-71 Gujrat-IV",
      "value": "NA-71"
  },
  {
      "label": "NA-72 Sialkot-I",
      "value": "NA-72"
  },
  {
      "label": "NA-73 Sialkot-II",
      "value": "NA-73"
  },
  {
      "label": "NA-74 Sialkot-III",
      "value": "NA-74"
  },
  {
      "label": "NA-76 Sialkot-V",
      "value": "NA-76"
  },
  {
      "label": "NA-77 Narowal-I",
      "value": "NA-77"
  },
  {
      "label": "NA-78 Narowal-II",
      "value": "NA-78"
  },
  {
      "label": "NA-79 Gujranwala-I",
      "value": "NA-79"
  },
  {
      "label": "NA-80 Gujranwala-II",
      "value": "NA-80"
  },
  {
      "label": "NA-81 Gujranwala-III",
      "value": "NA-81"
  },
  {
      "label": "NA-82 Gujranwala-IV",
      "value": "NA-82"
  },
  {
      "label": "NA-83 Gujranwala-V",
      "value": "NA-83"
  },
  {
      "label": "NA-84 Gujranwala-VI",
      "value": "NA-84"
  },
  {
      "label": "NA-85 Mandi Bahauddin-I",
      "value": "NA-85"
  },
  {
      "label": "NA-86 Mandi Bahauddin-II",
      "value": "NA-86"
  },
  {
      "label": "NA-87 Hafizabad-I",
      "value": "NA-87"
  },
  {
      "label": "NA-88 Sargodha-I",
      "value": "NA-88"
  },
  {
      "label": "NA-89 Sargodha-II",
      "value": "NA-89"
  },
  {
      "label": "NA-90 Sargodha-III",
      "value": "NA-90"
  },
  {
      "label": "NA-91 Sargodha-IV",
      "value": "NA-91"
  },
  {
      "label": "NA-92 Sargodha-V",
      "value": "NA-92"
  },
  {
      "label": "NA-93 Khushab-I",
      "value": "NA-93"
  },
  {
      "label": "NA-94 Khushab-II",
      "value": "NA-94"
  },
  {
      "label": "NA-95 Mianwali-I",
      "value": "NA-95"
  },
  {
      "label": "NA-96 Mianwali-II",
      "value": "NA-96"
  },
  {
      "label": "NA-97 Bhakkar-I",
      "value": "NA-97"
  },
  {
      "label": "NA-98 Bhakkar-II",
      "value": "NA-98"
  },
  {
      "label": "NA-99 Chiniot-I",
      "value": "NA-99"
  },
  {
      "label": "NA-100 Chiniot-II",
      "value": "NA-100"
  },
  {
      "label": "NA-101 Faisalabad-I",
      "value": "NA-101"
  },
  {
      "label": "NA-102 Faisalabad-II",
      "value": "NA-102"
  },
  {
      "label": "NA-103 Faisalabad-III",
      "value": "NA-103"
  },
  {
      "label": "NA-104 Faisalabad-IV",
      "value": "NA-104"
  },
  {
      "label": "NA-105 Faisalabad-V",
      "value": "NA-105"
  },
  {
      "label": "NA-106 Faisalabad-VI",
      "value": "NA-106"
  },
  {
      "label": "NA-107 Faisalabad-VII",
      "value": "NA-107"
  },
  {
      "label": "NA-108 Faisalabad-VIII",
      "value": "NA-108"
  },
  {
      "label": "NA-109 Faisalabad-IX",
      "value": "NA-109"
  },
  {
      "label": "NA-110 Faisalabad-X",
      "value": "NA-110"
  },
  {
      "label": "NA-111 Toba Tek Singh-I",
      "value": "NA-111"
  },
  {
      "label": "NA-112 Toba Tek Singh-II",
      "value": "NA-112"
  },
  {
      "label": "NA-113 Toba Tek Singh-III",
      "value": "NA-113"
  },
  {
      "label": "NA-114 Jhang-I",
      "value": "NA-114"
  },
  {
      "label": "NA-115 Jhang-II",
      "value": "NA-115"
  },
  {
      "label": "NA-116 Jhang-III",
      "value": "NA-116"
  },
  {
      "label": "NA-117 Nankana Sahib-I",
      "value": "NA-117"
  },
  {
      "label": "NA-118 Nankana Sahib-II",
      "value": "NA-118"
  },
  {
      "label": "NA-119 Sheikhupura-I",
      "value": "NA-119"
  },
  {
      "label": "NA-120 Sheikhupura-II",
      "value": "NA-120"
  },
  {
      "label": "NA-121 Sheikhupura-III",
      "value": "NA-121"
  },
  {
      "label": "NA-122 Sheikhupura-IV",
      "value": "NA-122"
  },
  {
      "label": "NA-123 Lahore-I",
      "value": "NA-123"
  },
  {
      "label": "NA-124 Lahore-II",
      "value": "NA-124"
  },
  {
      "label": "NA-125 Lahore-III",
      "value": "NA-125"
  },
  {
      "label": "NA-126 Lahore-IV",
      "value": "NA-126"
  },
  {
      "label": "NA-127 Lahore-V",
      "value": "NA-127"
  },
  {
      "label": "NA-128 Lahore-VI",
      "value": "NA-128"
  },
  {
      "label": "NA-129 Lahore-VII",
      "value": "NA-129"
  },
  {
      "label": "NA-130 Lahore-VIII",
      "value": "NA-130"
  },
  {
      "label": "NA-131 Lahore-IX",
      "value": "NA-131"
  },
  {
      "label": "NA-132 Lahore-X",
      "value": "NA-132"
  },
  {
      "label": "NA-133 Lahore-XI",
      "value": "NA-133"
  },
  {
      "label": "NA-134 Lahore-XII",
      "value": "NA-134"
  },
  {
      "label": "NA-135 Lahore-XIII",
      "value": "NA-135"
  },
  {
      "label": "NA-136 Lahore-XIV",
      "value": "NA-136"
  },
  {
      "label": "NA-137 Kasur-I",
      "value": "NA-137"
  },
  {
      "label": "NA-138 Kasur-II",
      "value": "NA-138"
  },
  {
      "label": "NA-139 Kasur-III",
      "value": "NA-139"
  },
  {
      "label": "NA-140 Kasur-IV",
      "value": "NA-140"
  },
  {
      "label": "NA-141 Okara-I",
      "value": "NA-141"
  },
  {
      "label": "NA-142 Okara-II",
      "value": "NA-142"
  },
  {
      "label": "NA-143 Okara-III",
      "value": "NA-143"
  },
  {
      "label": "NA-144 Okara-IV",
      "value": "NA-144"
  },
  {
      "label": "NA-145 Pakpattan-I",
      "value": "NA-145"
  },
  {
      "label": "NA-146 Pakpattan-II",
      "value": "NA-146"
  },
  {
      "label": "NA-147 Sahiwal-I",
      "value": "NA-147"
  },
  {
      "label": "NA-148 Sahiwal-II",
      "value": "NA-148"
  },
  {
      "label": "NA-149 Sahiwal-III",
      "value": "NA-149"
  },
  {
      "label": "NA-150 Khanewal-I",
      "value": "NA-150"
  },
  {
      "label": "NA-151 Khanewal-II",
      "value": "NA-151"
  },
  {
      "label": "NA-152 Khanewal-III",
      "value": "NA-152"
  },
  {
      "label": "NA-153 Khanewal-IV",
      "value": "NA-153"
  },
  {
      "label": "NA-154 Multan-I",
      "value": "NA-154"
  },
  {
      "label": "NA-155 Multan-II",
      "value": "NA-155"
  },
  {
      "label": "NA-156 Multan-III",
      "value": "NA-156"
  },
  {
      "label": "NA-157 Multan-IV",
      "value": "NA-157"
  },
  {
      "label": "NA-158 Multan-V",
      "value": "NA-158"
  },
  {
      "label": "NA-159 Multan-VI",
      "value": "NA-159"
  },
  {
      "label": "NA-160 Lodhran-I",
      "value": "NA-160"
  },
  {
      "label": "NA-161 Lodhran-II",
      "value": "NA-161"
  },
  {
      "label": "NA-162 Vehari-I",
      "value": "NA-162"
  },
  {
      "label": "NA-163 Vehari-II",
      "value": "NA-163"
  },
  {
      "label": "NA-164 Vehari-III",
      "value": "NA-164"
  },
  {
      "label": "NA-165 Vehari-IV",
      "value": "NA-165"
  },
  {
      "label": "NA-166 Bahawalnagar-I",
      "value": "NA-166"
  },
  {
      "label": "NA-167 Bahawalnagar-II",
      "value": "NA-167"
  },
  {
      "label": "NA-168 Bahawalnagar-III",
      "value": "NA-168"
  },
  {
      "label": "NA-169 Bahawalnagar-IV",
      "value": "NA-169"
  },
  {
      "label": "NA-170 Bahawalpur-I",
      "value": "NA-170"
  },
  {
      "label": "NA-171 Bahawalpur-II",
      "value": "NA-171"
  },
  {
      "label": "NA-172 Bahawalpur-III",
      "value": "NA-172"
  },
  {
      "label": "NA-173 Bahawalpur-IV",
      "value": "NA-173"
  },
  {
      "label": "NA-174 Bahawalpur-V",
      "value": "NA-174"
  },
  {
      "label": "NA-175 Rahim Yar Khan-I",
      "value": "NA-175"
  },
  {
      "label": "NA-176 Rahim Yar Khan-II",
      "value": "NA-176"
  },
  {
      "label": "NA-177 Rahim Yar Khan-III",
      "value": "NA-177"
  },
  {
      "label": "NA-178 Rahim Yar Khan-IV",
      "value": "NA-178"
  },
  {
      "label": "NA-179 Rahim Yar Khan-V",
      "value": "NA-179"
  },
  {
      "label": "NA-180 Rahim Yar Khan-VI",
      "value": "NA-180"
  },
  {
      "label": "NA-181 Muzaffargarh-I",
      "value": "NA-181"
  },
  {
      "label": "NA-182 Muzaffargarh-II",
      "value": "NA-182"
  },
  {
      "label": "NA-183 Muzaffargarh-III",
      "value": "NA-183"
  },
  {
      "label": "NA-184 Muzaffargarh-IV",
      "value": "NA-184"
  },
  {
      "label": "NA-185 Muzaffargarh-V",
      "value": "NA-185"
  },
  {
      "label": "NA-186 Muzaffargarh-VI",
      "value": "NA-186"
  },
  {
      "label": "NA-187 Layyah-I",
      "value": "NA-187"
  },
  {
      "label": "NA-188 Layyah-II",
      "value": "NA-188"
  },
  {
      "label": "NA-189 D.G.Khan-I",
      "value": "NA-189"
  },
  {
      "label": "NA-190 D.G.Khan-II",
      "value": "NA-190"
  },
  {
      "label": "NA-191 D.G.Khan-III/option>",
      "value": "NA-191"
  },
  {
      "label": "NA-192 D.G.Khan-IV",
      "value": "NA-192"
  },
  {
      "label": "NA-193 Rajanpur-I",
      "value": "NA-193"
  },
  {
      "label": "NA-194 Rajanpur-II",
      "value": "NA-194"
  },
  {
      "label": "NA-195 Rajanpur-III",
      "value": "NA-195"
  },
  {
      "label": "--Sindh--",
      "value": ""
  },
  {
      "label": "NA-196 Jacobabad",
      "value": "NA-196"
  },
  {
      "label": "NA-197 Kashmore",
      "value": "NA-197"
  },
  {
      "label": "NA-198 Shikarpur-I",
      "value": "NA-198"
  },
  {
      "label": "NA-199 Shikarpur-II",
      "value": "NA-199"
  },
  {
      "label": "NA-200 Larkana-I",
      "value": "NA-200"
  },
  {
      "label": "NA-201 Larkana-II",
      "value": "NA-201"
  },
  {
      "label": "NA-202 Kamber Shahdadkot-I",
      "value": "NA-202"
  },
  {
      "label": "NA-203 Kamber Shahdadkot-II",
      "value": "NA-203"
  },
  {
      "label": "NA-204 Ghotki-I",
      "value": "NA-204"
  },
  {
      "label": "NA-205 Ghotki-II",
      "value": "NA-205"
  },
  {
      "label": "NA-206 Sukkur-I",
      "value": "NA-206"
  },
  {
      "label": "NA-207 Sukkur-II",
      "value": "NA-207"
  },
  {
      "label": "NA-208 Khairpur-I",
      "value": "NA-208"
  },
  {
      "label": "NA-209 Khairpur-II",
      "value": "NA-209"
  },
  {
      "label": "NA-210 Khairpur-III",
      "value": "NA-210"
  },
  {
      "label": "NA-211 Naushero Feroze-I",
      "value": "NA-211"
  },
  {
      "label": "NA-212 Naushero Feroze-I",
      "value": "NA-212"
  },
  {
      "label": "NA-213 Shaheed Benazirabad-I",
      "value": "NA-213"
  },
  {
      "label": "NA-214 Shaheed Benazirabad-II",
      "value": "NA-214"
  },
  {
      "label": "NA-215 Sanghar-I",
      "value": "NA-215"
  },
  {
      "label": "NA-216 Sanghar-II",
      "value": "NA-216"
  },
  {
      "label": "NA-217 Sanghar-III",
      "value": "NA-217"
  },
  {
      "label": "NA-218 Mirpurkhas-I",
      "value": "NA-218"
  },
  {
      "label": "NA-219 Mirpurkhas-II",
      "value": "NA-219"
  },
  {
      "label": "NA-220 Umerkot",
      "value": "NA-220"
  },
  {
      "label": "NA-221 Tharparkar-I",
      "value": "NA-221"
  },
  {
      "label": "NA-222 Tharparkar-II",
      "value": "NA-222"
  },
  {
      "label": "NA-223 Matiari",
      "value": "NA-223"
  },
  {
      "label": "NA-224 Tando Allahyar/option>",
      "value": "NA-224"
  },
  {
      "label": "NA-225 Hyderabad-I",
      "value": "NA-225"
  },
  {
      "label": "NA-226 Hyderabad-II",
      "value": "NA-226"
  },
  {
      "label": "NA-227 Hyderabad-III",
      "value": "NA-227"
  },
  {
      "label": "NA-228 TANDO MUHAMMAD KHAN",
      "value": "NA-228"
  },
  {
      "label": "NA-229 Badin-I",
      "value": "NA-229"
  },
  {
      "label": "NA-230 Badin-II",
      "value": "NA-230"
  },
  {
      "label": "NA-231 Sujawal",
      "value": "NA-231"
  },
  {
      "label": "NA-232 Thatta",
      "value": "NA-232"
  },
  {
      "label": "NA-233 Jamshoro",
      "value": "NA-233"
  },
  {
      "label": "NA-234 Dadu-I",
      "value": "NA-234"
  },
  {
      "label": "NA-235 Dadu-II",
      "value": "NA-235"
  },
  {
      "label": "NA-236 Malir-I",
      "value": "NA-236"
  },
  {
      "label": "NA-237 Malir-II",
      "value": "NA-237"
  },
  {
      "label": "NA-238 Malir-III",
      "value": "NA-238"
  },
  {
      "label": "NA-239 Korangi Karachi-I",
      "value": "NA-239"
  },
  {
      "label": "NA-240 Korangi Karachi-II",
      "value": "NA-240"
  },
  {
      "label": "NA-241 Korangi Karachi-III",
      "value": "NA-241"
  },
  {
      "label": "NA-242 Karachi East-I",
      "value": "NA-242"
  },
  {
      "label": "NA-243 Karachi East-II",
      "value": "NA-243"
  },
  {
      "label": "NA-244 Karachi East-III",
      "value": "NA-244"
  },
  {
      "label": "NA-245 Karachi East-IV",
      "value": "NA-245"
  },
  {
      "label": "NA-246 Karachi South-I",
      "value": "NA-246"
  },
  {
      "label": "NA-247 Karachi South-II",
      "value": "NA-247"
  },
  {
      "label": "NA-248 Karachi West-I",
      "value": "NA-248"
  },
  {
      "label": "NA-250 Karachi West-III",
      "value": "NA-250"
  },
  {
      "label": "NA-251 Karachi West-IV",
      "value": "NA-251"
  },
  {
      "label": "NA-252 Karachi West-V",
      "value": "NA-252"
  },
  {
      "label": "NA-253 Karachi Central-I",
      "value": "NA-253"
  },
  {
      "label": "NA-254 Karachi Central-II",
      "value": "NA-254"
  },
  {
      "label": "NA-255 Karachi Central-III",
      "value": "NA-255"
  },
  {
      "label": "NA-256 Karachi Central-IV",
      "value": "NA-256"
  },
  {
      "label": "--Balochistan--",
      "value": ""
  },
  {
      "label": "NA-257 Killa Saifullah-cum-Zhob-cum-Sherani",
      "value": "NA-257"
  },
  {
      "label": "NA-258 Loralai-cum-Musa Khail-cum-Ziarat-cum-Dukki-cum-Harnai",
      "value": "NA-258"
  },
  {
      "label": "NA-259 Dera Bugti-cum-Kohlu-cum-Sibi-cum-Lehri",
      "value": "NA-259"
  },
  {
      "label": "NA-260 Nasirabad-cum-Kachhi-cum-Jhal-Magsi",
      "value": "NA-260"
  },
  {
      "label": "NA-261 Jafarabad-cum-Sohbatpur",
      "value": "NA-261"
  },
  {
      "label": "NA-262 Pishin",
      "value": "NA-262"
  },
  {
      "label": "NA-263 Killa Abdullah",
      "value": "NA-263"
  },
  {
      "label": "NA-264 Quetta-I",
      "value": "NA-264"
  },
  {
      "label": "NA-265 Quetta-II",
      "value": "NA-265"
  },
  {
      "label": "NA-266 Quetta-III",
      "value": "NA-266"
  },
  {
      "label": "NA-267 Mastung-cum-Kalat-cum-Shaheed-Sikandarabad",
      "value": "NA-267"
  },
  {
      "label": "NA-268 Chagai-cum-Nushki-cum-Kharan",
      "value": "NA-268"
  },
  {
      "label": "NA-269 Khuzdar",
      "value": "NA-269"
  },
  {
      "label": "NA-270 Panjgur-cum-Washuk-cum-Awaran",
      "value": "NA-270"
  },
  {
      "label": "NA-271 Kech",
      "value": "NA-271"
  },
  {
      "label": "NA-272 Lesbela-cum-Gwadar",
      "value": "NA-272"
  }
]
function Subject() {
  const [loading, setloading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({});
  const [finaldata, setfinaldata] = useState();
  const [seldata, setseldata] = useState({});
  const { register, handleSubmit,reset,control } = useForm();
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  const onSubmit = (data) => {
      if(data.email === '') data.email = seldata.email;
      if(data.cnic === '') data.cnic = seldata.cnic;
      if(data.name === '') data.name = seldata.name;
      if(data.fname === '') data.fname = seldata.fname;
      if(data.phone === '') data.phone = seldata.phone;
      if(data.edu === '') data.edu = seldata.edu;
      if(data.status === '') data.status = seldata.staus;
      if (data.constituency === ""|| data.constituency === undefined) data.constituency = seldata.constituency;
      else data.constituency = data.constituency.value;
      if(data.count === '') data.count = seldata.count;
      data.nominatedBy = seldata.nominatedBy;
    //  data.Image = seldata.Image;
      onUpdate(data);
      reset();
      setModalShow(false);
  };

  const onUpdate = (data) => {
    console.log(data);
      http.put('/candidate/update-candidates/' + seldata._id, data)
      .then((res) => {
        console.log('Candidate updated' + res)
        getData();
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setloading(true);
    const headers = { "Content-Type": "application/json" };
    const endpoint = "/candidate/get_candidates";
    http.get(endpoint, { headers })
      .then((response) => {
        setloading(false);
        response.data?.sort((a, b) => (parseInt(a.count) > parseInt( b.count) ? -1 : 1)) 
        setData({
          data: response.data,
        });
        setfinaldata(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function EditModal(props) {
    const center = {
      justifyContent: `center !important`
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="EditModalTitle"
        backdrop="static"
        keyboard={false}
        centered
      >
          <Modal.Header style={center}>
            <Modal.Title style={center} id="EditModal" >Canidate Details<h5 style={{fontSize: 10,color: `red`}}>*Fill only those Fileds you want to update</h5></Modal.Title>
          </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col lg={6} md={6} sm={6} >
             <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control  placeholder={seldata.name} {...register("name")} />
            </Form.Group>             
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone #</Form.Label>
              <Form.Control  placeholder={seldata.phone} {...register("phone")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEducation">
              <Form.Label>Education</Form.Label>
              <Form.Control  placeholder={seldata.edu} {...register("edu")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCount">
              <Form.Label>Vote Count</Form.Label>
              <Form.Control placeholder={seldata.count} readOnly {...register("count")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCount">
              <Form.Label>Constituency</Form.Label>
              <Controller name="constituency" control={control} render={({ field }) => <Select {...field} placeholder={seldata.constituency}  options={ConstituencyArray} />} />
            </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={6} >
              <Form.Group className="mb-3" controlId="formFatherName">
              <Form.Label>Father Name</Form.Label>
              <Form.Control  placeholder={seldata.fname} {...register("fname")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control  placeholder={seldata.email} {...register("email")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCnic">
              <Form.Label>Cnic without dash</Form.Label>
              <Form.Control  placeholder={seldata.cnic} {...register("cnic")} />
            </Form.Group>
            <Form.Group controlId="formBasicSelect">
        <Form.Label>Candidate Status</Form.Label> <Badge  style={{ backgroundColor: seldata.status === 'approved' ?  '#008000': 'red'}} count={seldata.status ? seldata.status.charAt(0).toUpperCase() + seldata.status.slice(1) : ''} />
        <Form.Control as="select" placeholder={seldata.status} {...register("status")} >
        <option value="">Change Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </Form.Control>
      </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{justifyContent : `center`}}>
            <Button style={{background:`#008000`,border: `#008000`}} type="submit">Update</Button>
            <Button style={{background:`#008000`,border: `#008000`}} onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
  
  function confirm(e) {
    http
      .delete("/candidate/delete-candidates/" + e._id)
      .then((res) => {
        message.success("Delete Successfulyy!!!");
        getData();
      })
      .catch((error) => {
        message.error(error.message);
        console.log(error);
      });
    
  }

  function cancel(e) {
    message.error("Candiate not Deleted!");
  }
  const FindArry = (arr,search) =>{
    const res = arr.filter((obj) =>
    JSON.stringify(obj).toLowerCase().includes(search.toLowerCase())
  )
  setData({data:res});
    }
    const handleInputSearch = (event) =>{
      const target = event.target.value;
       FindArry(finaldata,target);
    }
  const TStyle = {
    textAlign: `center`, 
    verticalAlign: `middle`,
    cursor:`pointer`
    }
  return (
    <Container fluid>
       <Spin spinning={loading}  tip="Loading Subjects..." size="large">
      <section>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <section className="mb-2">
            <Row>
              <h3>Candidates:</h3>
            </Row>
          </section>
          <section>
          <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                </div>
                <input type="text" className="form-control" onChange={handleInputSearch} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            {data.data ? (
              <Table
                style={TStyle}
                striped
                table-success="true"
                bordered
                hover
                size="sm"
                responsive
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Father Name</th>
                    <th>Constituency</th>
                    <th>Vote</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map(function (item, i) {
                    return (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.name}</td>
                        <td>{item.fname}</td>
                        <td>{item.constituency}</td>
                        <td>{item.count}</td>
                        <td>{item.phone}</td>
                        <td>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => {
                              setModalShow(true);
                              setseldata(item);
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Popconfirm
                            title="Are you sure to delete this Candidate?"
                            onConfirm={() => confirm(item)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button variant="outline-danger" size="sm">
                              Delete
                            </Button>
                          </Popconfirm>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <EditModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                
              </Table>
               
            ) : (
              <Empty />
            )}
          </section>
          <Pagination size="sm">{items}</Pagination>
        </div>
      </section>
      </Spin>
    </Container>
  );
}

export default Subject;
