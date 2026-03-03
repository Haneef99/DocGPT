import uuid
from sqlalchemy import Column, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from core.database import Base

class DocumentVector(Base):
    __tablename__ = 'document_vectors'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String, ForeignKey('documents.id', ondelete='CASCADE'), index=True, nullable=False)
    content = Column(Text, nullable=False)
    embedding = Column(Vector(384))

    document = relationship("Document", backref="vectors")