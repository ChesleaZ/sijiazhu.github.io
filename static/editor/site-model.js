(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SiteContentModel=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const defaults = {
  "version": 2,
  "theme": {
    "background": "#0b1220",
    "text": "#e6edf4",
    "muted": "#b2c0d0",
    "accent": "#7ad8c7",
    "surface": "#111d2e",
    "fontSize": 20,
    "cardRadius": 10
  },
  "home": {
    "greeting": "Hello, my name is",
    "name": "Sijia Zhu.",
    "prefix": "My research explores",
    "topics": [
      "AI for biology",
      "biological foundation models",
      "multimodal learning for biology",
      "cell-to-text generation"
    ],
    "photoSide": "right",
    "photoWidth": 340,
    "titleSize": 64,
    "topicSize": 43,
    "backgroundEnabled": true,
    "backgroundOpacity": 14,
    "backgroundAnimated": true,
    "backgroundPositions": {
      "network": {
        "x": 0,
        "y": 0
      },
      "cells": {
        "x": 0,
        "y": 0
      },
      "surface": {
        "x": 0,
        "y": 0
      },
      "umap": {
        "x": 0,
        "y": 0
      },
      "objective": {
        "x": 0,
        "y": 0
      },
      "attention": {
        "x": 0,
        "y": 0
      },
      "robot": {
        "x": 0,
        "y": 0
      },
      "tubes": {
        "x": 0,
        "y": 0
      }
    }
  },
  "about": {
    "title": "About Me",
    "paragraphs": [
      "I am an M.S. student in Applied Mathematics and Statistics at Johns Hopkins University and a visiting graduate student in Biostatistics at Harvard. My research focuses on AI for biology, supported by a background in mathematics and statistics.",
      "I study scaling laws for single-cell representation models, examining how cell number, sequencing depth, and batch structure shape biological information recovery and experimental design.",
      "I also build pipelines that connect cellular representations with large language models for cell-to-text generation and interpretation. I am interested in extending this work to multimodal foundation models for biology."
    ],
    "skillsLabel": "Tools and topics I work with:",
    "skills": [
      "Python",
      "PyTorch",
      "R",
      "Representation Learning",
      "Scaling Laws",
      "Single-cell Analysis"
    ],
    "width": 900,
    "photoVisible": true,
    "photoSide": "right",
    "backgroundEnabled": true,
    "backgroundOpacity": 12,
    "backgroundAnimated": true,
    "backgroundPositions": {
      "network": {
        "x": 0,
        "y": 0
      },
      "cells": {
        "x": 0,
        "y": 0
      },
      "surface": {
        "x": 0,
        "y": 0
      },
      "umap": {
        "x": 0,
        "y": 0
      },
      "objective": {
        "x": 0,
        "y": 0
      },
      "attention": {
        "x": 0,
        "y": 0
      },
      "robot": {
        "x": 0,
        "y": 0
      },
      "tubes": {
        "x": 0,
        "y": 0
      }
    }
  },
  "research": {
    "heading": "Research",
    "academicHeading": "Academic",
    "items": [
      {
        "institution": "Massachusetts General Hospital",
        "role": "Student Researcher",
        "topic": "Pathway-Independent Genetic Signals in Type 2 Diabetes Clusters",
        "tags": [
          "Type 2 diabetes",
          "Polygenic scores",
          "Genetic clustering"
        ],
        "bullets": [
          "Investigating whether data-driven genetic clusters in type 2 diabetes capture biological information beyond curated pathway-based polygenic scores.",
          "Constructing individual-level cluster-specific scores from variant-level disease clusters and comparing them with pathway-based pPGS derived from Reactome and KEGG.",
          "Studying whether residual cluster signals can reveal novel or cross-pathway disease mechanisms."
        ]
      },
      {
        "institution": "Harvard T.H. Chan School of Public Health",
        "role": "Student Researcher",
        "topic": "Scaling Laws in Single-Cell Representation Learning",
        "tags": [
          "Single-cell multi-omics",
          "Random Matrix Theory",
          "Representation learning"
        ],
        "bullets": [
          "Applying Random Matrix Theory to derive mutual-information-based measures for biological signal recovery in single-cell multi-omics data.",
          "Developing theoretical scaling laws for cell number, sequencing depth, and batch effects in single-cell data.",
          "Conducting real-data analyses to evaluate how representation learning embeddings recover biological information."
        ]
      },
      {
        "institution": "Johns Hopkins University",
        "role": "Student Researcher",
        "topic": "Survival Analysis in Oncology Clinical Trials",
        "tags": [
          "Survival analysis",
          "Cox modeling",
          "Clinical trials"
        ],
        "bullets": [
          "Performed survival analysis on multi-arm oncology clinical trial data.",
          "Constructed time-to-event endpoints for staggered therapy initiation, treatment discontinuation, and right-censoring.",
          "Conducted Kaplan-Meier analysis, median survival estimation, and Cox proportional hazards modeling with clinical covariates."
        ]
      },
      {
        "institution": "The Chinese University of Hong Kong",
        "role": "Student Researcher",
        "topic": "Single-Cell Sequencing Analysis of Blood Tissue Samples",
        "tags": [
          "Single-cell analysis",
          "Leiden clustering",
          "Cell annotation"
        ],
        "bullets": [
          "Analyzed single-cell sequencing data from blood tissue samples to study cellular-level molecular profiles.",
          "Used PCA and Leiden clustering to identify heterogeneous cell populations and annotate cells with marker genes.",
          "Applied cellular enrichment analysis to connect marker genes with disease-related biological signals."
        ]
      }
    ],
    "academicItems": [
      {
        "title": "Teaching Assistant",
        "institution": "Johns Hopkins University",
        "details": [
          "Bayesian Statistics"
        ]
      },
      {
        "title": "Peer Reviewer",
        "institution": "Academic Service",
        "details": [
          "Current Medical Imaging",
          "CMC-Computers, Materials & Continua",
          "Journal of Intelligent & Fuzzy Systems",
          "Journal of Computer Science",
          "Journal of Fuzzy Logic and Modeling in Engineering"
        ]
      }
    ],
    "width": 960,
    "backgroundEnabled": true,
    "backgroundOpacity": 12,
    "backgroundAnimated": true,
    "backgroundPositions": {
      "network": {
        "x": 0,
        "y": 0
      },
      "cells": {
        "x": 0,
        "y": 0
      },
      "surface": {
        "x": 0,
        "y": 0
      },
      "umap": {
        "x": 0,
        "y": 0
      },
      "objective": {
        "x": 0,
        "y": 0
      },
      "attention": {
        "x": 0,
        "y": 0
      },
      "robot": {
        "x": 0,
        "y": 0
      },
      "tubes": {
        "x": 0,
        "y": 0
      }
    }
  },
  "publications": {
    "title": "Selected Publication",
    "archiveLabel": "View all",
    "archiveTitle": "All Publications",
    "archiveDescription": "Complete publication list",
    "columns": 3,
    "width": 1000,
    "items": [
      {
        "year": 2026,
        "title": "Random Matrix Scaling Laws in Single-Cell Representation Learning",
        "venue": "Manuscript under review",
        "status": "Under review",
        "authors": "S. Zhu, J. Hu, R. Ma, A. Klein, G. Gowri",
        "keywords": [
          "Single-cell representation learning",
          "Scaling laws",
          "Random matrix theory"
        ],
        "url": "https://chesleaz.github.io/sijiazhu.github.io/papers/single-cell-scaling/",
        "selected": true
      },
      {
        "year": 2026,
        "title": "Bayesian Hierarchical Modeling and Clustering for Malignant Cancer Diagnosis",
        "venue": "Bayesian Analysis",
        "status": "Under review",
        "authors": "S. Zhu, J. Ma, Z. Liu",
        "keywords": [
          "Bayesian modeling",
          "Clustering",
          "Medical diagnosis"
        ],
        "url": "https://scholar.google.com/scholar?q=Bayesian+Hierarchical+Modeling+and+Clustering+for+Malignant+Cancer+Diagnosis",
        "selected": true
      },
      {
        "year": 2025,
        "title": "New Distance Measures of Complex Fermatean Fuzzy Sets with Applications in Decision Making and Clustering Problems",
        "venue": "Information Sciences",
        "status": "Published",
        "authors": "Z. Liu, S. Zhu, T. Senapati, M. Deveci, D. Pamucar, R. R. Yager",
        "keywords": [
          "Fuzzy sets",
          "Decision making",
          "Clustering"
        ],
        "url": "https://doi.org/10.1016/j.ins.2024.121310",
        "selected": true
      },
      {
        "year": 2025,
        "title": "Auto Feature Weighted c-Means Type Clustering Methods for Color Image Segmentation",
        "venue": "Engineering Applications of Artificial Intelligence",
        "status": "Published",
        "authors": "S. Zhu, Z. Liu, S. Letchmunan, H. Qiu",
        "keywords": [
          "Clustering",
          "Image segmentation",
          "Feature weighting"
        ],
        "url": "https://doi.org/10.1016/j.engappai.2025.110768",
        "selected": true
      },
      {
        "year": 2025,
        "title": "Novel Distance Measures on Complex Picture Fuzzy Environment: Applications in Pattern Recognition, Medical Diagnosis and Clustering",
        "venue": "Journal of Applied Mathematics and Computing",
        "status": "Published",
        "authors": "S. Zhu, Z. Liu, S. Letchmunan, G. Ulutagay, K. Ullah",
        "keywords": [
          "Pattern recognition",
          "Medical diagnosis",
          "Clustering"
        ],
        "url": "https://doi.org/10.1007/s12190-024-02293-z",
        "selected": true
      },
      {
        "year": 2025,
        "title": "An Improved Interval-Valued Picture Fuzzy TOPSIS Approach Based on New Divergence Measures for Risk Assessment",
        "venue": "Computer Modeling in Engineering & Sciences",
        "status": "Published",
        "authors": "S. Zhu, Y. Li, P. Balaji, A. Thiyagarajan, R. Aluvalu, Z. Liu",
        "keywords": [
          "Risk assessment",
          "TOPSIS",
          "Divergence measures"
        ],
        "url": "https://doi.org/10.32604/cmes.2025.068734",
        "selected": true
      },
      {
        "year": 2025,
        "title": "Robust Vector-Weighted and Matrix-Weighted Multi-View Hard-Means Clustering",
        "venue": "Intelligent Systems with Applications",
        "status": "Published",
        "authors": "Z. Liu, S. Aljohani, S. Zhu, T. Senapati, G. Ulutagay, S. Haque, N. Mlaiki",
        "keywords": [
          "Multi-view clustering",
          "Hard c-means",
          "View weighting"
        ],
        "url": "https://doi.org/10.1016/j.iswa.2024.200470",
        "selected": true
      },
      {
        "year": 2025,
        "title": "New Distance and Similarity Measures of Picture Fuzzy Sets and Applications",
        "venue": "Intelligent Decision Technologies",
        "status": "Published",
        "authors": "H. Li, S. Zhu, Z. Liu",
        "keywords": [
          "Picture fuzzy sets",
          "Similarity measures"
        ],
        "url": "https://doi.org/10.1177/18724981241295947",
        "selected": false
      },
      {
        "year": 2025,
        "title": "A Unified Parametric Divergence Operator for Fermatean Fuzzy Environment and Its Application in Machine Learning and Intelligent Decision-Making",
        "venue": "Computer Modeling in Engineering & Sciences",
        "status": "Published",
        "authors": "Z. Liu, S. Zhu, Y. Huang, T. Senapati, X. Li, W. Mbasso, H. D. Dhumras, et al.",
        "keywords": [
          "Fermatean fuzzy sets",
          "Machine learning",
          "Decision making"
        ],
        "url": "https://doi.org/10.32604/cmes.2025.072352",
        "selected": false
      },
      {
        "year": 2025,
        "title": "A Generalized Hellinger Distance-Based Spherical Fuzzy TOPSIS Method for Sustainable Transport Systems Selection",
        "venue": "Intelligent Urban Mobility",
        "status": "Book chapter",
        "authors": "Z. Liu, S. Zhu",
        "keywords": [
          "Spherical fuzzy sets",
          "TOPSIS",
          "Sustainable transport"
        ],
        "url": "https://doi.org/10.1016/b978-0-443-34160-1.00002-x",
        "selected": false
      },
      {
        "year": 2025,
        "title": "Multi-View Alternative Hard c-Means Clustering",
        "venue": "International Journal of Data Science and Analytics",
        "status": "Published",
        "authors": "Z. Liu, S. Zhu, S. Lyu, S. Letchmunan",
        "keywords": [
          "Multi-view clustering",
          "Hard c-means"
        ],
        "url": "https://doi.org/10.1007/s41060-024-00685-9",
        "selected": false
      },
      {
        "year": 2024,
        "title": "Novel alpha-Divergence Measures on Picture Fuzzy Sets and Interval-Valued Picture Fuzzy Sets",
        "venue": "Engineering Applications of Artificial Intelligence",
        "status": "Published",
        "authors": "S. Zhu, Z. Liu, G. Ulutagay, M. Deveci, D. Pamucar",
        "keywords": [
          "Divergence measures",
          "Picture fuzzy sets"
        ],
        "url": "https://doi.org/10.1016/j.engappai.2024.109041",
        "selected": false
      },
      {
        "year": 2024,
        "title": "Novel Distance Measures of Picture Fuzzy Sets and Their Applications",
        "venue": "Arabian Journal for Science and Engineering",
        "status": "Published",
        "authors": "S. Zhu, Z. Liu, A. U. Rahman",
        "keywords": [
          "Distance measures",
          "Picture fuzzy sets"
        ],
        "url": "https://doi.org/10.1007/s13369-024-08925-7",
        "selected": false
      },
      {
        "year": 2024,
        "title": "ProNet: Adaptive Retinal Vessel Segmentation Algorithm Based on Improved UperNet Network",
        "venue": "CMC-Computers, Materials & Continua",
        "status": "Published",
        "authors": "S. Zhu, P. Wang, K. Shen",
        "keywords": [
          "Medical imaging",
          "Retinal segmentation",
          "Deep learning"
        ],
        "url": "https://doi.org/10.32604/cmc.2023.045506",
        "selected": false
      },
      {
        "year": 2023,
        "title": "Distance Measures of Picture Fuzzy Sets and Interval-Valued Picture Fuzzy Sets with Their Applications",
        "venue": "AIMS Mathematics",
        "status": "Published",
        "authors": "S. Zhu, Z. Liu",
        "keywords": [
          "Picture fuzzy sets",
          "Interval-valued fuzzy sets"
        ],
        "url": "https://doi.org/10.3934/math.20231525",
        "selected": false
      }
    ],
    "backgroundEnabled": true,
    "backgroundOpacity": 12,
    "backgroundAnimated": true,
    "backgroundPositions": {
      "network": {
        "x": 0,
        "y": 0
      },
      "cells": {
        "x": 0,
        "y": 0
      },
      "surface": {
        "x": 0,
        "y": 0
      },
      "umap": {
        "x": 0,
        "y": 0
      },
      "objective": {
        "x": 0,
        "y": 0
      },
      "attention": {
        "x": 0,
        "y": 0
      },
      "robot": {
        "x": 0,
        "y": 0
      },
      "tubes": {
        "x": 0,
        "y": 0
      }
    }
  },
  "contact": {
    "title": "Get In Touch",
    "intro": "I am happy to connect about biostatistics, biomedical data science, research collaborations, and graduate study.",
    "width": 680,
    "links": [
      {
        "label": "Email",
        "url": "mailto:szhu62@jhu.edu",
        "icon": "email"
      },
      {
        "label": "LinkedIn",
        "url": "https://www.linkedin.com/in/sijia-zhu-66862a307/",
        "icon": "linkedin"
      },
      {
        "label": "Google Scholar",
        "url": "https://scholar.google.com/citations?user=hN1J4bUAAAAJ&hl=en",
        "icon": "scholar"
      }
    ],
    "backgroundEnabled": true,
    "backgroundOpacity": 12,
    "backgroundAnimated": true,
    "backgroundPositions": {
      "network": {
        "x": 0,
        "y": 0
      },
      "cells": {
        "x": 0,
        "y": 0
      },
      "surface": {
        "x": 0,
        "y": 0
      },
      "umap": {
        "x": 0,
        "y": 0
      },
      "objective": {
        "x": 0,
        "y": 0
      },
      "attention": {
        "x": 0,
        "y": 0
      },
      "robot": {
        "x": 0,
        "y": 0
      },
      "tubes": {
        "x": 0,
        "y": 0
      }
    }
  },
  "paper": {
    "eyebrow": "Research paper",
    "title": "Random Matrix Scaling Laws in Single-Cell Representation Learning",
    "authors": "S. Zhu, J. Hu, R. Ma, A. Klein, and G. Gowri",
    "status": "Manuscript under review",
    "overviewTitle": "Research overview",
    "paragraphs": [
      "This work studies how cell number, sequencing depth, and batch structure shape biological information recovery in single-cell representation learning. It connects a random matrix theory framework with empirical evaluation of single-cell representations, including scVI, Geneformer, and scGPT.",
      "A further focus is experimental design under fixed budgets: how to balance cell number and sequencing depth when collecting single-cell data. Applications include systemic lupus erythematosus (SLE) and Perturb-seq datasets."
    ],
    "availabilityTitle": "Manuscript availability",
    "availabilityText": "The manuscript is currently under review. A link to the preprint will be added here when it becomes publicly available.",
    "preprintLabel": "Read the preprint",
    "preprintURL": "",
    "width": 900,
    "backgroundEnabled": true,
    "backgroundOpacity": 12,
    "backgroundAnimated": true,
    "backgroundPositions": {
      "network": {
        "x": 0,
        "y": 0
      },
      "cells": {
        "x": 0,
        "y": 0
      },
      "surface": {
        "x": 0,
        "y": 0
      },
      "umap": {
        "x": 0,
        "y": 0
      },
      "objective": {
        "x": 0,
        "y": 0
      },
      "attention": {
        "x": 0,
        "y": 0
      },
      "robot": {
        "x": 0,
        "y": 0
      },
      "tubes": {
        "x": 0,
        "y": 0
      }
    }
  },
  "archive": {
    "backgroundEnabled": true,
    "backgroundOpacity": 12,
    "backgroundAnimated": true,
    "backgroundPositions": {
      "network": {
        "x": 0,
        "y": 0
      },
      "cells": {
        "x": 0,
        "y": 0
      },
      "surface": {
        "x": 0,
        "y": 0
      },
      "umap": {
        "x": 0,
        "y": 0
      },
      "objective": {
        "x": 0,
        "y": 0
      },
      "attention": {
        "x": 0,
        "y": 0
      },
      "robot": {
        "x": 0,
        "y": 0
      },
      "tubes": {
        "x": 0,
        "y": 0
      }
    }
  }
};
const clone=value=>JSON.parse(JSON.stringify(value));
function safeURL(value,fallback=''){if(typeof value!=='string')return fallback;if(!value.trim())return '';try{const url=new URL(value,'https://chesleaz.github.io/sijiazhu.github.io/');return ['https:','http:','mailto:'].includes(url.protocol)?value.trim().slice(0,2000):fallback;}catch(error){return fallback;}}
function normalize(input){
 const read=(value,template,path)=>{
  const key=path.split('.').pop();
  if(Array.isArray(template)){if(!Array.isArray(value))return clone(template);return value.slice(0,100).map(item=>read(item,template[0]===undefined?'':template[0],path+'.item'));}
  if(template&&typeof template==='object'){const out={};Object.keys(template).forEach(k=>{out[k]=read(value&&typeof value==='object'?value[k]:undefined,template[k],path?path+'.'+k:k);});return out;}
  if(typeof template==='boolean')return typeof value==='boolean'?value:template;
  if(typeof template==='number'){if(typeof value!=='number'||!Number.isFinite(value))return template;const ranges={width:[520,1200],photoWidth:[240,400],titleSize:[46,80],topicSize:[26,46],x:[-100,100],y:[-100,100],backgroundOpacity:[0,40],fontSize:[16,24],cardRadius:[0,24],columns:[1,3],year:[1900,2200],version:[2,2]};const [min,max]=ranges[key]||[-100000,100000];const clipped=Math.min(max,Math.max(min,value));return key==='x'||key==='y'?Math.round(clipped*10)/10:Math.round(clipped);}
  if(typeof value!=='string')return template;
  if(['background','text','muted','accent','surface'].includes(key))return /^#[0-9a-f]{6}$/i.test(value)?value:template;
  if(key==='photoSide')return value==='left'?'left':'right';
  if(key==='icon')return ['email','linkedin','scholar'].includes(value)?value:'email';
  if(key==='url'||key==='preprintURL')return safeURL(value,template);
  return value.slice(0,12000);
 };
 const out=read(input,defaults,'');
 out.home.topics=out.home.topics.map(x=>x.trim().replace(/\\.$/,'')).filter(Boolean).slice(0,8);
 if(!out.home.topics.length)out.home.topics=clone(defaults.home.topics);
 return out;
}
function setPath(object,path,value){const parts=String(path).split('.');if(parts.some(x=>['__proto__','prototype','constructor'].includes(x)))throw Error('Invalid path');let target=object;for(const part of parts.slice(0,-1)){if(!target||!Object.prototype.hasOwnProperty.call(target,part))throw Error('Unknown path');target=target[part];}const key=parts[parts.length-1];if(!target||!Object.prototype.hasOwnProperty.call(target,key))throw Error('Unknown field');target[key]=value;return object;}
function getPath(object,path){return String(path).split('.').reduce((value,key)=>value&&Object.prototype.hasOwnProperty.call(value,key)?value[key]:undefined,object);}
return {defaults,normalize,clone,safeURL,setPath,getPath};
});



