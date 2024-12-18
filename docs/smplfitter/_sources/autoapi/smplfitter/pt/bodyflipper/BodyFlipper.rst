smplfitter.pt.bodyflipper.BodyFlipper
=====================================

.. py:class:: smplfitter.pt.bodyflipper.BodyFlipper(body_model, num_betas = 10)

   Bases: :py:obj:`torch.nn.Module`


   Horizontally (x axis) flips SMPL-like body model parameters, to mirror the body.

   :param body_model: A body model whose parameters are to be transformed.


   .. py:method:: flip(pose_rotvecs, shape_betas, trans, kid_factor = None, num_iter = 1)

      Returns the body model parameters that represent the horizontally flipped 3D human, i.e.,
      flipped along the x axis.

      Internally, this function flips and reorders the vertices and joints then fits
      parameters to the flipped input.

      :param pose_rotvecs: Input body part orientations expressed as rotation vectors
                           concatenated to shape (batch_size, num_joints*3).
      :param shape_betas: Input beta coefficients representing body shape.
      :param trans: Input translation parameters (meters).
      :param kid_factor: Coefficient for the kid blendshape.
                         Default is None, which disables the use of the kid factor.
                         See the AGORA paper :footcite:`patel2021agora` for more information.
      :param num_iter: Number of iterations for fitting.

      :returns:

                Dictionary
                    - **pose_rotvecs** (*torch.Tensor*) -- Rotation vectors for the flipped mesh.
                    - **shape_betas** (*torch.Tensor*) -- Body shape beta parameters for the flipped                     mesh.
                    - **trans** (*torch.Tensor*) -- Translation parameters for the flipped mesh.



   .. py:method:: flip_vertices(inp_vertices)

      Converts the input vertices to the mirrored version by reordering and flipping
      along the x axis.

      :param inp_vertices: A batch of input vertices to be flipped, shaped                 (batch_size, num_vertices, 3).

      :returns: Flipped vertices, shaped (batch_size, num_vertices, 3).



   .. py:method:: naive_flip_rotvecs(pose_rotvecs)

      Flips each pose rotation vector along the x axis and reorders them to exchange
      left and right body parts. Does not take into account that the body model is slighly
      asymmetric.

      :param pose_rotvecs: Input body part orientations expressed as rotation vectors, shaped                 (batch_size, num_joints*3).

      :returns: Flipped pose rotation vectors, shaped (batch_size, num_joints*3).



.. footbibliography::