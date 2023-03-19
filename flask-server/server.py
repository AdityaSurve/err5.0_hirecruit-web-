import pdfplumber
import docx
import docx2txt
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
@app.route("/upload",methods=['POST'])
def upload():
    file = request.files['file']
    with pdfplumber.open(file) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    doc = docx.Document()
    doc.add_paragraph(text)
    doc.save("resume.docx")

    my_text=docx2txt.process("resume.docx")
    my_text=my_text.lower()
    my_text=my_text.replace(" ","_")

    phone_pattern=re.compile(r'[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]')
    phone_matches=phone_pattern.finditer(my_text)
    phone=""
    for phoneOUT in phone_matches:
        phone=phone+phoneOUT.group()

    skills_pattern=re.compile(r'java|python|operating_system|.net_framework|software_development|agile_development|vbscript|C#|javascript|software_design|sql|html|services|programming_languages|spring|python_programming_language|structured_query_language|design_patterns|multithreading|test|messaging|technical_support|software|quality_assurance|debugging|application_development|coding|framework|industry|bootstrap|engineer|securities|consulting|it_management|compliance|programming|automation|documentation|integrate|training|hypertext_markup_language|nodejs|css|json|angular|communications|information_technology|financial|dart|react|xml|git|github|django|firebase|tailwindcss|flutter|dsa|data_structure|c|figma')
    skill_matches=skills_pattern.finditer(my_text)
    skills=""
    for skillOUT in skill_matches:
        skills=skills+" "+skillOUT.group()
    my_skills=skills.split()
    my_skills=list(set(my_skills))
    
    # education_pattern = re.compile(r"(education|qualification)\W*(.+?)(technical_skills|$)")
    # education_matches = education_pattern.findall(my_text)
    # education=""
    # for educationOUT in education_matches:
    #     education=education+" "+educationOUT.group()
    # my_education=education.split()
    # my_education=list(set(my_education))
    # education_pattern=re.compile(r"((education|qualification).+?(technical_skills))", re.IGNORECASE | re.DOTALL)
    # education_matches=education_pattern.finditer(my_text)
    # education=""
    # for educationOUT in education_matches:
    #     education=education+" "+educationOUT.group()
    # my_education=education.split()
    # my_education=list(set(my_education))
	
    

	# education_pattern = r"(?i)(education|qualifications?|academic background|educational qualifications)(.*)"
    # match = re.search(education_pattern, text)
    # if match:
    #     education_section = match.group(2)
    #     print(type(education_section))
    # else:
    #     print("Education section not found in the resume")
    result = {
        "phone": phone,
        "skills": my_skills,
    }
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)