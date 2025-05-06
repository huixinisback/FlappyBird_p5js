import os
import xml.etree.ElementTree as ET
from xml.dom import minidom

def get_all_relative_paths(base_folder):
    base_folder = os.path.abspath(base_folder)
    file_paths = []
    for root, _, files in os.walk(base_folder):
        for file in files:
            full_path = os.path.join(root, file)
            relative_path = os.path.relpath(full_path, base_folder)
            file_paths.append(relative_path.replace("\\", "/"))  # use forward slashes
    return file_paths

def create_manifest_xml(base_folder, launch_file="index.html"):
    manifest = ET.Element("manifest", {
        "identifier": "com.example.myscormproject",
        "version": "1.0",
        "xmlns": "http://www.imsproject.org/xsd/imscp_rootv1p1p2",
        "xmlns:adlcp": "http://www.adlnet.org/xsd/adlcp_rootv1p2",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation": "http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd"
    })

    orgs = ET.SubElement(manifest, "organizations", {"default": "org1"})
    org = ET.SubElement(orgs, "organization", {"identifier": "org1"})
    ET.SubElement(org, "title").text = "My SCORM Project"
    item = ET.SubElement(org, "item", {"identifier": "item1", "identifierref": "resource1"})
    ET.SubElement(item, "title").text = "Launch My Content"

    resources = ET.SubElement(manifest, "resources")
    resource = ET.SubElement(resources, "resource", {
        "identifier": "resource1",
        "type": "webcontent",
        "adlcp:scormtype": "sco",
        "href": launch_file
    })

    file_paths = get_all_relative_paths(base_folder)
    for path in file_paths:
        ET.SubElement(resource, "file", {"href": path})

    # Beautify the XML
    xml_str = minidom.parseString(ET.tostring(manifest)).toprettyxml(indent="  ")
    with open(os.path.join(base_folder, "imsmanifest.xml"), "w", encoding="utf-8") as f:
        f.write(xml_str)

    print("imsmanifest.xml created successfully.")

# Usage
if __name__ == "__main__":
    create_manifest_xml(".")  # Use current folder or pass another path
